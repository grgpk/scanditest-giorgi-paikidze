import React from "react";
import logo from "./header-logo.png";
import emptyCart from "./EmptyCart.png";
import vector from "./Vector.png";
import Navigation from "../Navigation/Navigation";
import CurrencyList from "../CurrencyList/CurrencyList";
import CartOverlay from "../Cart-overlay/CartOverlay";
import OutsideClickHandler from "react-outside-click-handler";
import "./Header.css";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      currencyListActive: false,
      currency: {
        USD: "$",
        GBP: "£",
        JPY: "¥",
        AUD: "$",
        RUB: "₽",
      },
      cartOverlay: false,
    };
  }

  // method to open and close currency switcher
  listCurrencies = () => {
    this.setState((prev) => ({ currencyListActive: !prev.currencyListActive }));
  };

  // method to open and close mini cart
  openCartOverlay = () => {
    this.setState((prevState) => ({ cartOverlay: !prevState.cartOverlay }));
  };

  render() {
    return (
      <header className="header">
        <Navigation />
        <img src={logo} alt="header-logo" className="header-logo" />
        <div className="actions">
          <span className="currency">
            {this.props.selectedCurrency.selectedCurrencySymbol}
          </span>
          <OutsideClickHandler
            // close currency switcher when clicking outside of it
            onOutsideClick={() => {
              this.setState(() => ({
                currencyListActive: false,
              }));
            }}
          >
            <div className="currency-list-container">
              <button onClick={this.listCurrencies} className="currency-btn">
                <img
                  src={vector}
                  alt="vector"
                  className={
                    this.state.currencyListActive
                      ? "currency-listing-active"
                      : "currency-listing"
                  }
                />
              </button>
              {/* conditionally render currency switcher on changing the state */}
              {this.state.currencyListActive && (
                <CurrencyList
                  isActive={this.state.currencyListActive}
                  currencySymbol={this.state.currency}
                  selectCurrency={this.props.selectCurrency}
                />
              )}
            </div>
          </OutsideClickHandler>
          <OutsideClickHandler
            // close mini cart when clicking outside of it
            onOutsideClick={() => {
              this.setState(() => ({ cartOverlay: false }));
            }}
          >
            <button onClick={this.openCartOverlay} className="actions-cart">
              {/* conditionally render items quantity badge on cart icon */}
              {this.props.itemsQuantity ? (
                <div className="cart-items-quantity">
                  {this.props.itemsQuantity}
                </div>
              ) : null}
              <img src={emptyCart} alt="cart" />
            </button>
            {this.state.cartOverlay && (
              <CartOverlay
                cart={this.props.cart}
                currency={this.props.selectedCurrency}
                removeFromCart={this.props.removeFromCart}
                addToCart={this.props.addToCart}
                itemsQuantity={this.props.itemsQuantity}
                openCartOverlay={this.openCartOverlay}
                getTotalPrice={this.props.getTotalPrice}
              />
            )}
          </OutsideClickHandler>
        </div>
        {/* add grey transparent background when mini cart is opened */}
        {this.state.cartOverlay && <div className="cart-overlay"></div>}
      </header>
    );
  }
}

export default Header;
