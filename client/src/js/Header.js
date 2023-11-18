import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

// Header Section

const Header = () => {
  return (
    <div className="flex flex-col items-center pt-20 pb-7">
      <div id="header-whitespace" className="h-16"></div>
      
      <h1 className="text-6xl py-1" id="header">SkinGenius</h1>
      <p className="md:text-2xl text-base pb-1" id="header">
        The beginning of your skin care journey
      </p>
      
      <p className="text-md md:text-xl text-center pt-5">
        Scire Essentials presents you a test to check your skin type and become{" "}
        <span className="hidden md:inline"><br/></span>
        aware which products and routine suits your skin better.
      </p>

      <div className="flex flex-row items-center justify-center">
        <p className="text-md md:text-xl text-center py-6 pr-2">
          You may also try our Messenger chatbot here:
        </p>

        <ThemeProvider theme={theme}>
          <FacebookIcon color="primary" />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;