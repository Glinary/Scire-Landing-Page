import { Button, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import theme from "./theme";

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
      "My forehead and nose are very shiny and oily but my cheeks are matte.",
      "Crazy oily.",
      "Tight or splotchy. Like the desert. I need to put moisturizer on ASAP!",
      "Dull and tired. It feels mostly dry.",
      "My complexion is only slightly oily at the end of the day.",
      "I have some redness and irritation when exposed to skincare products or other environmental factors.",
      "It looks normal. Not overly dry or oily.",
    ],
  },
  {
    question: "Describe your pores.",
    options: [
      "My pores are large, visible, and sometimes clogged all over my face.",
      "Depends on where they are on my face. My pores are medium to large around my T-zone.",
      "Small to medium-sized. My pores are small and not visible.",
      "They seem to change with the day. My pores are visible but small.",
    ],
  },
  {
    question: "How frequently do you have breakouts or active acne lesions?",
    options: ["Frequent", "Seldom"],
  },
  {
    question: "Have you ever had a sunburn or noticed pigmentation changes after sun exposure?",
    options: ["Yes", "No"],
  },
];

function Test() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showTest, setShowTest] = useState(false);
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (index) => {
    setAnswers([...answers, index]);
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleStartTest = () => {
    setShowTest(true);
  };

  const processAnswers = (answers) => {
    console.log(answers);
  };

  // When email form is submitted
  const handleEmailSubmit = (event) => {
    event.preventDefault();
    console.log(email);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };


  // Landing page shown before the test starts
  if (!showTest) {
    return (
      <div className="flex flex-row justify-center">
        <ThemeProvider theme={theme}>
          <button onClick={handleStartTest}>Start Test</button>
        </ThemeProvider>
      </div>
    );
  }

  // When all questions have been asked
  if (currentQuestion >= questions.length) {
    return (
      <div>
        <p>Results: {processAnswers(answers)}</p>
        <h2>Want to save your result? We'll gladly email you</h2>
        <form onSubmit={handleEmailSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  // Render the current question and options
  const { question, options } = questions[currentQuestion];

  return (
    <div>
      <h2>{question}</h2>
      <ul>
        {options.map((option, index) => (
          <li key={option}>
            <button onClick={() => handleAnswer(index)}>{option}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Test;
