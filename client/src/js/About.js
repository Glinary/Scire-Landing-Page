import React from "react";

// For the About section 
function About() {
  console.log("About component rendered");

  return (
    <div id="about-container">
    <div className="p-14" id="about">
      <h1 className="text-3xl font-bold py-2 pb-7 text-center opacity-100" id="about-title">About the Test</h1>
      <p className="text-center text-xs lg:text-sm lg:px-10 lg:pb-2 font-bold" id="about-desc">
      SkinGenius is an advanced skin assessment tool distinguished by its meticulous design and thorough professional review carried out by a
      doctor affiliated with Scire Essentials. The diagnostic test delves deep into the subtleties of your skin type, offering an accurate and
      personalized skincare profile. The blend of expert programming and rigorous evaluation ensures that the results are both precise and
      reliable, allowing you to embark on a skincare journey that is tailor-made for your unique skin needs.
      </p>
    </div>
    </div>
  );
}

export default About;
