import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-family: "Inter", sans-serif;
  }

  html, body {
    overflow-x: hidden;
    font-size: 14px;
    font-weight: 400;
    -webkit-font-smoothing: antialiased; 
    background-color: #333333 ; 
    color: #333; 

    height: 100vh;
  }

  input, select, textarea {
    font-family: "Inter", sans-serif; 
    font-size: 14px; 
  }

  button {
    cursor: pointer;
    font-family: "Inter", sans-serif; 

    border: none;
  }

  a {
    text-decoration: none; 
    color: inherit;
  }

  ul, ol {
    list-style: none; 
  }

  img {
    max-width: 100%; 
    height: auto;
  }


`;
