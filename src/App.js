import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Clothes from "./components/Clothes/Clothes";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          {/* <Route path="/" element={<Clothes />} /> */}
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
