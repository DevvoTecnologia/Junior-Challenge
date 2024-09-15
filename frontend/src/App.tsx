import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import isValidProp from "@emotion/is-prop-valid";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { StyleSheetManager } from "styled-components";

import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes";

const App = () => {
  return (
    <Router>
      <StyleSheetManager shouldForwardProp={(prop) => isValidProp(prop)}>
        <AuthProvider>
          <AppRoutes />
          <ToastContainer />
        </AuthProvider>
      </StyleSheetManager>
    </Router>
  );
};

export default App;
