import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Clothes from "./components/Clothes/Clothes";
import Tech from "./components/Tech/Tech";
import AllCategory from "./components/AllCategory/AllCategory";
import { PDP } from "./components/PDP/PDP";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: {
        selectedCurrencySymbol: "$",
        selectedCurrency: "USD",
      },
    };
  }

  selectCurrency = () => {
    return (e) => {
      this.setState({
        currency: {
          selectedCurrencySymbol: e.target.innerText.split(" ")[0],
          selectedCurrency: e.target.innerText.split(" ")[1],
        },
      });
    };
  };

  render() {
    return (
      <BrowserRouter>
        <Header
          selectedCurrency={this.state.currency}
          selectCurrency={this.selectCurrency}
        />
        <Routes>
          <Route
            path="/"
            element={<AllCategory currency={this.state.currency} />}
          />
          <Route
            path="/all"
            element={<AllCategory currency={this.state.currency} />}
          />
          <Route
            path="/clothes"
            element={<Clothes currency={this.state.currency} />}
          />
          <Route
            path="/tech"
            element={<Tech currency={this.state.currency} />}
          />
          <Route
            path="product/:id"
            element={<PDP currency={this.state.currency} />}
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
