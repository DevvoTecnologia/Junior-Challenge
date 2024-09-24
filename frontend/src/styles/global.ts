import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-weight: 400;
        font-size: 1rem;
    }

    html {
        margin: 0;
        padding: 0;
    }

    main {
        min-height:100vh  !important;
    }

    button { 
        cursor: pointer;
    }

    * {
        padding: 0;
        border: 0;
        margin: 0;
        font-family: 'Roboto', sans-serif !important;
    }
`;
