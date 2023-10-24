import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

// Header secton

const Header = () => {
  return (
    /* Scire Essentials Logo */

    <div className="flex flex-col items-center pt-20 pb-7">
      <h1 className="text-5xl py-2" id="header">SkinGenius</h1>
      <p className="py-1.5" id="header">
        The beginning of your skin care journey
      </p>
      <p className="text-center pt-5">
        Scire Essentials presents you a test to check your skin type and become{" "}
        <br />
        aware which products and routine suits your skin better.
      </p>

      <div className="flex flex-row items-center justify-center">
        <p className="text-center py-6 pr-2">
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
