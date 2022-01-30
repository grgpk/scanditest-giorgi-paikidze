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
      currency: JSON.parse(localStorage.getItem("currency")) || {
        selectedCurrencySymbol: "$",
        selectedCurrency: "USD",
      },
      cart: JSON.parse(localStorage.getItem("cart")) || [],
    };
  }

  // Method for getting total price, called in cart overlay
  getTotalPrice = () => {
    const { currency, cart } = this.state;

    const totalPrice = cart.reduce((a, item) => {
      // Getting price for the selected currency
      const selectedPrice = item.prices.find(
        (el) => el.currency === currency.selectedCurrency
      );
      return a + selectedPrice.amount * item.count;
    }, 0);
    return `${currency.selectedCurrencySymbol} ${totalPrice.toFixed(2)}`;
  };

  addToCart = (product) => {
    // Check if product is already in the cart and if it is, increase it's count
    const item = this.state.cart.find((el) => el.id === product.id);
    if (item) {
      this.setState(
        (prevState) => {
          return {
            cart: prevState.cart.map((el) =>
              el.id === product.id ? { ...product, count: el.count + 1 } : el
            ),
          };
        },
        () => {
          localStorage.setItem("cart", JSON.stringify(this.state.cart));
        }
      );
    } // If product is not in the cart already, first check whether attributes is selected, then add in the cart
    else if (
      product.selectedAttributes.length > 0 ||
      product.attributes.length === 0
    ) {
      this.setState(
        (prevState) => {
          return {
            cart: [...prevState.cart, { ...product, count: 1 }],
          };
        },
        () => {
          localStorage.setItem("cart", JSON.stringify(this.state.cart));
        }
      );
    } // If attributes are not selected, ask to select them
    else {
      alert("Please, select attributes.");
    }
  };

  removeFromCart = (product) => {
    // If product count in the cart is just 1, remove it from the cart
    if (product.count === 1) {
      this.setState(
        (prevState) => {
          return {
            cart: prevState.cart.filter((el) => el.id !== product.id),
          };
        },
        () => {
          localStorage.setItem("cart", JSON.stringify(this.state.cart));
        }
      );
    } // If product count is more than 1, just decrease the counter by 1
    else {
      this.setState(
        (prevState) => {
          return {
            cart: prevState.cart.map((el) =>
              el.id === product.id ? { ...el, count: el.count - 1 } : el
            ),
          };
        },
        () => {
          localStorage.setItem("cart", JSON.stringify(this.state.cart));
        }
      );
    }
  };

  // Method to switch currency, called in currencyList (switcher)
  selectCurrency = (e) => {
    this.setState(
      {
        currency: {
          // get the innerText string of el and extract currency symbol and abbreviation
          selectedCurrencySymbol: e.target.innerText.split(" ")[0],
          selectedCurrency: e.target.innerText.split(" ")[1],
        },
      },
      () => {
        localStorage.setItem("currency", JSON.stringify(this.state.currency));
      }
    );
  };

  render() {
    return (
      <BrowserRouter>
        <Header
          selectedCurrency={this.state.currency}
          selectCurrency={this.selectCurrency}
          itemsQuantity={this.state.cart.length}
          cart={this.state.cart}
          addToCart={this.addToCart}
          removeFromCart={this.removeFromCart}
          getTotalPrice={this.getTotalPrice}
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
