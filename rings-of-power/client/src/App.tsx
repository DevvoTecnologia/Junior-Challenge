import React from "react";
import Router from "./routes";
import { RingProvider } from "./Providers/Ring";

function App() {
  return (
    <div className="App">
      <RingProvider>
        <Router />
      </RingProvider>
    </div>
  );
}

export default App;
