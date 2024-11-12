import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../style/GlobalStyle";
import { Home } from "../pages/Home";
import { Register } from "../pages/Register";
const Routing: FC = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
};

export default Router;
