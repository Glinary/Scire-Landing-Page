import React from "react";

// For the About section 
function About() {
  console.log("About component rendered");

  return (
    <div className="bg-[#DA9B2A] p-14">
      <h1 className="text-3xl font-bold py-2 pb-7 text-center">About the Test</h1>
      <p className="text-center px-10 pb-2 font-bold">
      SkinGenius is an advanced skin assessment tool distinguished by its meticulous design and thorough professional review carried out by a
      doctor affiliated with Scire Essentials. The diagnostic test delves deep into the subtleties of your skin type, offering an accurate and
      personalized skincare profile. The blend of expert programming and rigorous evaluation ensures that the results are both precise and
      reliable, allowing you to embark on a skincare journey that is tailor-made for your unique skin needs.
      </p>
    </div>
  );
}

export default About;
