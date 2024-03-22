"use client";

import { createGlobalStyle } from "styled-components";

import { baseTheme as theme } from "@lawallet/ui";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    
    margin: 0;
    padding: 0;
  }

  html {
    overflow-x: hidden;

    font-size: 20px;
  }

  body {
    overflow-x: hidden;

    /* display: flex;
    flex-direction: column; */
    min-width: 100vw;
    min-height: 100dvh;

    background: ${theme.colors.gray15};

    color: ${theme.colors.text};
    font-size: 1em;
    font-weight: 400;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: inherit !important;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;

    border-radius: 50px;
  }

  a, 
  button {
    /* font-family: var(--font-primary); */
  }
`;

export default GlobalStyles;
