import React from "react";
import logo from "./header-logo.png";
import emptyCart from "./EmptyCart.png";
import vector from "./Vector.png";
import Navigation from "../Navigation/Navigation";
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <Navigation />
        <img src={logo} alt="header-logo" className="header-logo" />
        <div className="actions">
          <span className="currency">$</span>
          <img src={vector} alt="vector" />
          <img src={emptyCart} alt="cart" className="actions-cart" />
        </div>
      </header>
    );
  }
}

export default Header;
