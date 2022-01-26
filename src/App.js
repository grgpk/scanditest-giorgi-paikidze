import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Clothes from "./components/Clothes/Clothes";
import Tech from "./components/Tech/Tech";
import AllCategory from "./components/AllCategory/AllCategory";
import { PDP } from "./components/PDP/PDP";
import { Cart } from "./components/Cart/Cart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: {
        selectedCurrencySymbol: "$",
        selectedCurrency: "USD",
      },
      cart: JSON.parse(localStorage.getItem("cart")) || [],
      itemsQuantity: JSON.parse(localStorage.getItem("itemsQuantity")) || 0,
    };
  }

  addToCart = (product) => {
    const item = this.state.cart.find((el) => el.id === product.id);
    if (item) {
      this.setState(
        (prevState) => {
          return {
            cart: prevState.cart.map((el) =>
              el.id === product.id ? { ...el, count: el.count + 1 } : el
            ),
            itemsQuantity: prevState.itemsQuantity + 1,
          };
        },
        () => {
          localStorage.setItem("cart", JSON.stringify(this.state.cart));
          localStorage.setItem(
            "itemsQuantity",
            JSON.stringify(this.state.itemsQuantity)
          );
        }
      );
    } else {
      this.setState(
        (prevState) => {
          return {
            cart: [...prevState.cart, { ...product, count: 1 }],
            itemsQuantity: prevState.itemsQuantity + 1,
          };
        },
        () => {
          localStorage.setItem("cart", JSON.stringify(this.state.cart));
          localStorage.setItem(
            "itemsQuantity",
            JSON.stringify(this.state.itemsQuantity)
          );
        }
      );
    }
  };

  removeFromCart = (product) => {
    if (product.count === 1) {
      this.setState(
        (prevState) => {
          return {
            cart: prevState.cart.filter((el) => el.id !== product.id),
            itemsQuantity: prevState.itemsQuantity
              ? prevState.itemsQuantity - 1
              : 0,
          };
        },
        () => {
          localStorage.setItem("cart", JSON.stringify(this.state.cart));
          localStorage.setItem(
            "itemsQuantity",
            JSON.stringify(this.state.itemsQuantity)
          );
        }
      );
    } else {
      this.setState(
        (prevState) => {
          return {
            cart: prevState.cart.map((el) =>
              el.id === product.id ? { ...el, count: el.count - 1 } : el
            ),
            itemsQuantity: prevState.itemsQuantity
              ? prevState.itemsQuantity - 1
              : 0,
          };
        },
        () => {
          localStorage.setItem("cart", JSON.stringify(this.state.cart));
          localStorage.setItem(
            "itemsQuantity",
            JSON.stringify(this.state.itemsQuantity)
          );
        }
      );
    }
  };

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
          itemsQuantity={this.state.itemsQuantity}
          cart={this.state.cart}
          addToCart={this.addToCart}
          removeFromCart={this.removeFromCart}
        />
        <Routes>
          <Route
            path="/"
            element={
              <AllCategory
                currency={this.state.currency}
                addToCart={this.addToCart}
              />
            }
          />
          <Route
            path="/all"
            element={
              <AllCategory
                currency={this.state.currency}
                addToCart={this.addToCart}
              />
            }
          />
          <Route
            path="/clothes"
            element={
              <Clothes
                currency={this.state.currency}
                addToCart={this.addToCart}
              />
            }
          />
          <Route
            path="/tech"
            element={
              <Tech currency={this.state.currency} addToCart={this.addToCart} />
            }
          />
          <Route
            path="product/:id"
            element={
              <PDP currency={this.state.currency} addToCart={this.addToCart} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={this.state.cart}
                addToCart={this.addToCart}
                removeFromCart={this.removeFromCart}
                currency={this.state.currency}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
