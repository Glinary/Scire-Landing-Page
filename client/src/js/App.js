import "../css/App.css";
import Main from "./Main";
import Header from "./Header";
import Footer from "./Footer";
import About from "./About";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React, {useEffect, useState} from 'react';

// Set-up of the entire page 
function App() {
  // Use the useEffect hook to make an HTTP request when the component mounts
  useEffect(() => {
    fetch('/') // Replace 'api/data' with your server's endpoint
      .then(response => response.json())
      .then(data => {
        console.log(data); // Handle the data as needed
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);


  return (
    <div>
      <Header />
      <Main />

      <About />
      <Footer />
    </div>
  );
}

export default App;
