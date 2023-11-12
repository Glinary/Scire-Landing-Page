import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

// Test Header secton

const TestHeader = () => {
  return (
    <div className="flex flex-col items-center pt-20">
      <div id="header-whitespace"></div>
      
      <h1 className="text-5xl py-1" id="test-header">SKIN TEST</h1>
      
      <p className="text-center pt-2">
        Scire Essentials presents you a test to check your skin type and become{" "}
        <br />
        aware which products and routine suits your skin better.
      </p>

      <div className="flex flex-row items-center justify-center">
        <p className="text-center py-5 pr-2">
          You may also try our Messenger chatbot here:
        </p>

        <ThemeProvider theme={theme}>
          <FacebookIcon color="primary" />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default TestHeader;