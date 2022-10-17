import { createGlobalStyle } from "styled-components";
import { useContext } from "react";
import React from "react";

const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: 'Nunito', Helvetica, sans-serif;
    }
 
    body {        
        margin: 0;  
        font-size: 14px;
    }
`;

function GlobalStyle() {
  return <StyledGlobalStyle />;
}

export default GlobalStyle;
