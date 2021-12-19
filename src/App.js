import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Clothes from "./components/Clothes/Clothes";
import Tech from "./components/Tech/Tech";
import AllCategory from "./components/AllCategory/AllCategory";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<AllCategory />} />
          <Route path="/all" element={<AllCategory />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/tech" element={<Tech />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
