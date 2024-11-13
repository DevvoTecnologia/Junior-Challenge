import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
  html{
    font-size: 62.5%;
  }

  :root{
    --white: #FFFFFF;
    --dark-blue: #042C69;
    --blue:#517CBC;
    --semi-black: #202225;
    --dark-gray: #2F3136;
    --gray: #4F545C;  
    --white-gray: #EBEDEF;
    --red: #ff0000;
    --black: #11010b;
    --green-dark: #98956a;
    --light: #f5ebce
    }

  a{
    text-decoration: none;
  }

  button{
    cursor: pointer;
  }
  input, select{
    outline: none;
  }

  ol, ul{
    list-style: none;
  }

  ::-webkit-scrollbar {
    width: 8px; 
  }

  ::-webkit-scrollbar-track {
    background: var(--black); 
  }

  ::-webkit-scrollbar-thumb {
    background-color:var(--green-dark) ; 
    border-radius: 8px; 
    border: 2px solid var(--black); 
  }
`;
export default GlobalStyle;
