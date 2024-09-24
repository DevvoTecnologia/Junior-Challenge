import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Form } from "../pages/Form";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Form />} />
      <Route path="/edit/:id" element={<Form />} />
    </Routes>
  );
}
