import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import RingForm from "./components/RingForm";
import RingCarousel from "./components/RingCarousel";

const App = () => {
  const [reload, setReload] = useState(false);

  return (
    <div>
      <h1>Os Anéis de Poder</h1>
      <RingForm onSubmit={() => setReload(!reload)} />
      <RingCarousel />
    </div>
  );
};

export default App;
