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

  body{
    ::-webkit-scrollbar {
      width: 10px;
      height: 5px;

    }
    
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: var(--white-gray);
    }
  }

  :root{
    --white: #FFFFFF;
    --dark-blue: #042C69;
    --blue:#517CBC;
    --semi-black: #202225;
    --dark-gray: #2F3136;
    --gray: #4F545C;  
    --white-gray: #EBEDEF;
    --red: #ff0000
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
`;
export default GlobalStyle;
