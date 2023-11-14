import React from "react";
import "./App.css";
import { BrowerserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div className="App">
      <BrowerserRouter>
        <div className="container">
          <Routes>
            <Route />
          </Routes>
        </div>
      </BrowerserRouter>
    </div>
  );
};

export default App;
