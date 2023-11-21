import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

// Header Section

const Header = () => {
  return (
    <div className="flex flex-col items-center min-[700px]:pt-20 2xl:pt-28 min-[300px]:pt-48 max-[700px]:pb-3 pb-5">
      <div id="header-whitespace" className="h-16"></div>
      
      <h1 className="text-center text-6xl py-1 md:py-0.5 max-[700px]:text-5xl" id="header">SkinGenius</h1>
      <p className="text-center text-2xl max-[700px]:text-base pb-5" id="header">
        The beginning of your skin care journey
      </p>
      
      <p className="text-xl text-center pt-5 min-[700px]:text-xl max-[700px]:text-xs max-[700px]:px-10 min-[700px]:px-6">
        Scire Essentials presents you a test to check your skin type and become{" "}
        <span className="hidden md:inline"><br/></span>
        aware which products and routine suits your skin better.
      </p>

      <div className="flex flex-row items-center justify-center">
        <p className="text-center text-xl max-[700px]:text-xs py-6 pr-2">
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