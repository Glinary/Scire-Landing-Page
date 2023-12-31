import { Button, ThemeProvider } from "@mui/material";
import React, { useState, useEffect } from "react";
import { theme, quizTheme } from "./theme";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "./Header";
import FeaturedProducts from "./FeaturedProducts";
import axios from "axios";

import sensitive from "./images/sensitive-min.jpg"
import dry from "./images/dry-min.jpg"
import combination from "./images/combination-min.jpg"
import normal from "./images/normal-min.jpg"
import oily from "./images/oily-min.jpg"

// The main quiz section

// list of all questions
const questions = [
  {
    question:
      "If you wash your face and don't apply any products, how does your skin behave 30 minutes after?",
    options: [
      "It feels dry",
      "It feels calm, smooth, and soft",
      "It feels uneven (oily in some parts and dry on the other parts)",
      "It feels shiny and oily",
    ],
  },
  {
    question: "What does your skin typically look like at the end of the day?",
    options: [
      "My forehead and nose feels very shiny and oily but my cheeks are matte.",
      "My skin feels crazy oily.",
      "My skin feels tight or splotchy, like the desert. I need to put moisturizer on ASAP!",
      "My skin feels dull and tired; it's mostly dry.",
      "My complexion is only slightly oily at the end of the day.",
      "I experience redness and irritation when exposed to skincare products or other environmental factors.",
      "My skin feels normal, not overly dry or oily.",
    ],
  },
  {
    question: "Describe your pores.",
    options: [
      "My pores are large, visible, and sometimes clogged all over my face.",
      "My pores are medium to large around my T-zone.",
      "My pores are small and not visible.",
      "My pores are visible but small, and they seem to change throughout the day.",
    ],
  },
  {
    question: "How frequently do you have breakouts or active acne lesions?",
    options: ["Frequent", "Seldom"],
  },
  {
    question:
      "Have you ever had a sunburn or noticed pigmentation changes after sun exposure?",
    options: ["Yes", "No"],
  },
];

// steps for the stepper
const steps = [
  {
    label: "Guidelines",
  },
  {
    label: "Test",
  },
  {
    label: "Result",
  },
];

function connectToDatabase() {
  //console.log("I am at connectToDatabase()");
  // let userData = {
  //   sessionId: "sampleSessionId",
  // };
  // fetch("/api/start", {
  //   method: "post",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(userData),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //   });

  /// axios version
  axios
    .post("/api/start", {
      sessionId: "sampleSessionId",
    }, {
      withCredentials: true,
    })
    .then(function (response) {
      console.log(response);
    });
  /// axios version
}

function copyLinkToClipboard() {
  var linkInput = document.getElementById("websiteLink").value;
  var textarea = document.createElement("textarea");
  textarea.value = linkInput;
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, 99999); 

  // Try catch was used in case modern websites drop support for the API
  try {
    // Use the Clipboard API to copy the selected text to the clipboard
    // Note that the command is depcrecated but modern websites like Chrome have yet to drop it.
    document.execCommand("copy");
    alert("The quiz link was copied to your clipboard.\nShare the quiz to your friends!");
  } catch (err) {
    console.error("Unable to copy to clipboard", err);
  } finally {
    // Remove the temporary textarea
    document.body.removeChild(textarea);
  }
}



function storeResponse(currentQuestion, letter) {
  //console.log("I am at storeResponse()");

  // axios version
  axios
    .post("/api/storeResponse", {
      currentQuestion: currentQuestion,
      letter: letter,
    },{
      withCredentials: true,
    })
    .then(function (response) {
      console.log(response);
    });
  // axios version
}

async function storeEmail(email) {
  //console.log("I am at storeEmail()");

  // axios version
  axios
    .post("/api/storeEmail", {
      email: email,
    }, {
      withCredentials: true,
    })
    .then(function (response) {
      console.log(response);
    });

  // axios version
}

// store the results and send the email
async function storeResults(email, skin_type, acne_prone, sun_sensitive) {
  //console.log("I am at storeResults()");
  sendEmail(email, skin_type, acne_prone, sun_sensitive);

  axios.post("/api/storeResults", {
    skin_type: skin_type,
    acne_prone: acne_prone,
    sun_sensitive: sun_sensitive,
  }, {
    withCredentials: true,
  });
}

async function sendEmail(email, skin_type, acne_prone, sun_sensitive) {
  //console.log("I am at sendEmail()");

  axios.post("/api/sendEmail", {
    email: email,
    skin_type: skin_type,
    acne_prone: acne_prone,
    sun_sensitive: sun_sensitive,
  }, {
    withCredentials: true,
  });
}

function Test() {
  // Declaration of variables
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const [showTest, setShowTest] = useState(false);
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState([]);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [skinType, setSkinType] = useState(null);
  const [acneProne, setAcneProne] = useState(null);
  const [sunSensitive, setSunSensitive] = useState(null);
  const [skin_type_desc, setSkinTypeDesc] = useState(null);
  const [skin_type_img, setSkinTypeImg] = useState(null);
  const [guidelines, setGuidelines] = useState(true);
  const [showFeaturedProducts, setShowFeaturedProducts] = useState(false);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Check screen width on mount and on resize
    //console.log(window.innerHeight);
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1023); // Set the desired breakpoint
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial size on mount

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // When the start test button is clicked
  const handleStartTest = () => {
    //console.log("I am at handleStartTest()");
    connectToDatabase();
    setShowTest(true);
  };

  // Landing page shown before the test starts
  if (!showTest) {
    return (
      <div id="landing-page">
        <Header />
        <div className="flex flex-row justify-center mb-24">
          <ThemeProvider theme={theme}>
            <Button
              variant="outlined"
              color="primary"
              className="text-emerald-900"
              onClick={handleStartTest}
            >
              Start Test
            </Button>
          </ThemeProvider>
        </div>

        <div id="whitespace" className="h-40"></div>
      </div>
    );
  }

  // When a test option is clicked
  const handleAnswer = (option) => {
    //console.log("I am at handleAnswer")
    const index = options.indexOf(option);
    const letter = String.fromCharCode(index + 65);
    setAnswers([...answers, letter]);
    storeResponse(currentQuestion, letter);
    setCurrentQuestion(currentQuestion + 1);
  };

  // // Goes back 1 question
  const handleBack = () => {
    setCurrentQuestion(currentQuestion - 1);
    setAnswers(answers.slice(0, -1));
  };

  // When email form is submitted
  const handleEmailSubmit = async (event) => {
    //console.log("I am  at handleEmailSubmit");
    event.preventDefault();
    await storeEmail(email);
    await processAnswers();
    //console.log(email);
    setEmailSubmitted(true);
  };

  // When email input is changed
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Process the answers and return the final result
  const processAnswers = async () => {
    let skin_type, acne_prone, sun_sensitive, skin_type_desc, skin_type_img;

    axios
      .get("/api/getAnswers", {
        withCredentials: true,
      })
      .then(function (response) {
        const q1 = response.data.option0;
        const q2 = response.data.option1;
        const q3 = response.data.option2;
        const q4 = response.data.option3;
        const q5 = response.data.option4;

        if (q1 === "A") {
          if (q2 === "C" || q2 === "D") {
            skin_type = "Dry";
          } else if (q2 === "G") {
            skin_type = "Normal";
          } else if (q2 === "A" || q2 === "B" || q2 === "E") {
            skin_type = "Combination";
          } else if (q2 === "F") {
            skin_type = "Sensitive";
          }
        } else if (q1 === "B") {
          if (q2 === "B") {
            if (q3 === "A") {
              skin_type = "Oily";
            } else {
              skin_type = "Normal";
            }
          } else if (q2 === "C" || q2 === "D") {
            if (q3 === "B") {
              skin_type = "Combination";
            } else {
              skin_type = "Dry";
            }
          } else if (q2 === "A" || q2 === "E") {
            skin_type = "Combination";
          } else if (q2 === "F") {
            skin_type = "Sensitive";
          } else if (q2 === "G") {
            skin_type = "Normal";
          }
        } else if (q1 === "C") {
          if (q2 === "F") {
            skin_type = "Sensitive";
          } else if (q2 === "B") {
            if (q3 === "A" || q3 === "B") {
              skin_type = "Oily";
            } else if (q3 === "C" || q3 === "D") {
              skin_type = "Combination";
            }
          } else {
            skin_type = "Combination";
          }
        } else if (q1 === "D") {
          if (q2 === "F") {
            skin_type = "Sensitive";
          } else if (q2 === "A" || q2 === "E") {
            skin_type = "Combination";
          } else if (q2 === "G") {
            if (q3 === "A" || q3 === "B") {
              skin_type = "Oily";
            } else {
              skin_type = "Combination";
            }
          } else {
            skin_type = "Oily";
          }
        }

        if (q4 === "A") {
          acne_prone = "Acne Prone";
        } else {
          acne_prone = "Not Acne Prone";
        }

        if (q5 === "A") {
          sun_sensitive = "Sun Sensitive";
        } else {
          sun_sensitive = "Not Sun Sensitive";
        }

        if(skin_type === "Sensitive") {
          skin_type_desc = "Your skin type is <strong>Sensitive</strong>! It is more likely to react to external stimuli than normal skin. Your skin tends to be sensitive to heat, surfactants, and exfoliation, often resulting in irritation, redness, or swelling.";
          skin_type_img = sensitive;
        } else if(skin_type === "Dry") {
          skin_type_desc = "Your skin type is <strong>Dry</strong>! It usually feels tight, rough, and irritable, with a tendency to look flaky or even scaly. Additionally, dry skin often appears dehydrated and has visibly small pores.";
          skin_type_img = dry;
        } else if(skin_type === "Combination") {
          skin_type_desc = "Your skin type is <strong>Combination</strong>! It may be oily or normal around your nose, forehead, and chin (the T-Zone area of the face). Conversely, it could be dry or normal around your cheeks, mouth, and eyes (the U-Zone area of the face).";
          skin_type_img = combination;
        } else if(skin_type === "Normal") {
          skin_type_desc = "Your skin type is <strong>Normal</strong>! It boasts a regular texture with no noticeable imperfections, maintaining a clean and soft appearance. Normal skin typically does not require special care, as it tends to stay balanced and resilient.";
          skin_type_img = normal;
        } else if(skin_type === "Oily") {
          skin_type_desc = "Your skin type is <strong>Oily</strong>! It has a porous, humid and bright appearance. It tends to produce excess sebum and a susceptibility to acne and blackheads. Oily skin may require additional attention to manage oil production and maintain a matte finish throughout the day.";
          skin_type_img = oily;
        }

        storeResults(email, skin_type, acne_prone, sun_sensitive, skin_type_desc);

        setSkinType(skin_type);
        setAcneProne(acne_prone);
        setSunSensitive(sun_sensitive);
        setSkinTypeDesc(skin_type_desc);
        setSkinTypeImg(skin_type_img);

        console.log("Results stored as:", skin_type, acne_prone, sun_sensitive, skin_type_desc,skin_type_img);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  // When all questions have been asked
  if (currentQuestion >= questions.length) {
    if (!emailSubmitted) {
      return (
        <div id="results" className="pb-8">
          <Header />
          <div className="block lg:flex rounded-lg bg-emerald-900 max-[700px]:mx-8 max-[1000px]:mx-14 min-[1000px]:mx-16 p-5">
            {/* progress */}
            <div className="flex align-middle items-center justify-center py-3 lg:px-24">
              <ThemeProvider theme={quizTheme}>
                <Stepper
                  className="w-full"
                  activeStep={activeStep}
                  orientation={isSmallScreen ? "horizontal" : "vertical"}
                  {...(isSmallScreen ? { alternativeLabel: true } : {})}
                >
                  {steps.map((step) => (
                    <Step key={step.label}>
                      <StepLabel>{step.label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </ThemeProvider>
            </div>

            <div className="flex-1 bg-white mt-6 lg:mx-5 lg:mt-0 rounded-md">
              <div className="min-[1000px]:px-14 min-[1400px]:px-28 min-[2000px]:px-96">
                <h2 className="max-[700px]:text-sm pt-10 lg:pt-10 px-3 min-[700px]:text-md font-bold text-center lg:py-4">
                  Want to save your result? We would gladly email it to you
                </h2>
                <form
                  onSubmit={(e) => {
                    handleEmailSubmit(e);
                    setActiveStep(3);
                  }}
                >
                  <div className="flex justify-center">
                    <input
                      className="ring-2 ring-emerald-500 rounded outline-none w-3/4 lg:w-full h-7 p-3 py-4 mt-5 lg:mt-0 mx-auto"
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>

                  <div className="flex justify-center lg:py-10">
                    <button
                      className="block rounded-md bg-emerald-600 my-5 px-12 py-3 text-center font-semibold text-white hover:bg-emerald-700"
                      type="submit"
                      disabled={email.trim() === ""}
                    >
                      Next
                    </button>
                  </div>
                </form>

                <div className="flex justify-center items-end pb-5">
                  <p className="text-center text-xs max-[700px]:px-4 max-[1000px]:px-10">
                    *By entering your email, you consent to receive marketing
                    emails. For further information, please consult our Privacy
                    Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div id="results" className="pb-8">
          <Header />
          <div className="block lg:flex rounded-lg bg-emerald-900 max-[700px]:mx-8 max-[1000px]:mx-14 min-[1000px]:mx-16 p-5">
            {/* progress */}
            <div className="flex items-center justify-center py-3 lg:px-24">
              <ThemeProvider theme={quizTheme}>
                <Stepper
                  className="w-full"
                  activeStep={activeStep}
                  orientation={isSmallScreen ? "horizontal" : "vertical"}
                  {...(isSmallScreen ? { alternativeLabel: true } : {})}
                >
                  {steps.map((step) => (
                    <Step key={step.label}>
                      <StepLabel>{step.label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </ThemeProvider>
            </div>

            <div className="flex-1 bg-white mt-6 lg:mx-5 lg:mt-0 rounded-md">
              <div className="mx-5 xl:px-20 lg:py-5">
                <h2 className="text-sm pt-5 px-3 min-[700px]:text-xl font-bold text-center lg:py-4">
                  Here's your diagnosis:
                </h2>

                <div className="flex flex-row py-2 justify-center">
                  <p className="py-1">Skin Type:</p>
                  <h2 className="lg:font-semibold text-white rounded-full bg-emerald-600 px-3 py-1 ml-3">
                    {skinType}
                  </h2>
                </div>

                <div className="flex flex-row py-2 justify-center">
                  <p className="py-1">Acne Prone:</p>
                  <h2 className="lg:font-semibold text-white rounded-full bg-emerald-600 px-3 py-1 ml-3">
                    {acneProne}
                  </h2>
                </div>

                <div className="flex flex-row py-2 justify-center">
                  <p className="py-1">Sun-sensitive:</p>
                  <h2 className="lg:font-semibold text-white rounded-full bg-emerald-600 px-3 py-1 ml-3">
                    {sunSensitive}
                  </h2>
                </div>

                <div className="flex w-full ring-1 ring-emerald-800 rounded-md p-2 my-8">
                  <p className="basis-3/4">
                    {/* {skin_type_desc} */}
                    Your skin type is <strong>Sensitive</strong>! It is more likely to react to external stimuli than normal skin. Your skin tends to be sensitive to heat, surfactants, and exfoliation, often resulting in irritation, redness, or swelling.
                  </p>
                  <img src="skin_type_img" alt="" className="basis-1/4 border border-[#aaaaaa]"></img>
                </div>

                <div className="flex justify-center">
                  <input type="hidden" value="scireessentials.com" id="websiteLink"></input>
                  <button className="block rounded-2xl bg-emerald-600 my-0 px-12 py-1 text-center font-semibold text-white hover:bg-emerald-700"
                          onClick={() => copyLinkToClipboard()}>
                    Share the test!
                  </button>
                </div>

                <div className="flex justify-center">
                  <button className="block rounded-2xl bg-emerald-600 my-5 px-12 py-1 text-center font-semibold text-white hover:bg-emerald-700"
                          onClick={() => setShowFeaturedProducts(true)}>
                    I want to see featured products
                  </button>
                </div>
              </div>
            </div>
          </div>
          {showFeaturedProducts && <FeaturedProducts />}
        </div>
      );
    }
  }

  // Render the current question and options
  const { question, options } = questions[currentQuestion];

  // Display the current question and options
  return (
    <div id="quiz-page" className="pb-8">
      <Header />
      <div className="block lg:flex rounded-lg bg-emerald-900 max-[700px]:mx-8 max-[1000px]:mx-14 min-[1000px]:mx-16 p-5">
        {/* progress */}
        <div className="flex items-center justify-center py-3 lg:px-24">
          <ThemeProvider theme={quizTheme}>
            <Stepper
              className="w-full"
              activeStep={activeStep}
              orientation={isSmallScreen ? "horizontal" : "vertical"}
              {...(isSmallScreen ? { alternativeLabel: true } : {})}
            >
              {steps.map((step) => (
                <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </ThemeProvider>
        </div>

        {/* question */}
        <div className="flex-1 bg-white mt-6 lg:mx-5 lg:mt-0 rounded-md">
          {/* show guidelines first */}
          {guidelines ? (
            <div className="lg:px-5 md:px-4">
              <h2 className="max-[700px]:text-sm pt-5 px-3 min-[700px]:text-md font-bold text-center lg:py-4">
                For more accurate results, please answer the questions as
                truthfully as you can.
              </h2>

              <div className="flex justify-center">
                <button
                  className="block rounded-md bg-emerald-600 my-5 px-12 py-3 text-center font-semibold text-white hover:bg-emerald-700"
                  onClick={() => {
                    setGuidelines(false);
                    setActiveStep(1);
                  }}
                >
                  Got it!
                </button>
              </div>
            </div>
          ) : (
            <div className="min-[1400px]:px-24 min-[1000px]:px-16 py-5">
              <h2 className="max-[700px]:text-sm px-3 min-[700px]:text-md font-bold text-center">
                {question}
              </h2>

              <ul className="lg:pb-0">
                {options.map((option) => (
                  // wrap li in button
                  <button
                    className="mx-auto block max-[700px]:text-sm min-[700px]:text-md w-3/4 lg:w-full lg:rounded-md rounded-3xl bg-emerald-600 my-5 px-5 lg:px-12 py-3 text-center font-semibold text-white hover:bg-emerald-700"
                    key={option}
                    onClick={() => {
                      handleAnswer(option);
                      if (currentQuestion >= questions.length - 1) {
                        setActiveStep(2);
                      }
                    }}
                  >
                    <li>{option}</li>
                  </button>
                ))}
              </ul>

              {currentQuestion > 0 && (
                <ThemeProvider theme={theme}>
                  <div className="flex justify-center pb-4">
                    <Button
                      variant="text"
                      className="my-5 font-semibold text-emerald-700 hover:text-emerald-800"
                      onClick={handleBack}
                      startIcon={<ArrowBackIcon />}
                    >
                      Back
                    </Button>
                  </div>
                </ThemeProvider>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Test;
