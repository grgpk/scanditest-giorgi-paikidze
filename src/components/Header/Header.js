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
    };
  }

  listCurrencies = () => {
    this.setState((prev) => ({ currencyListActive: !prev.currencyListActive }));
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

              {this.state.currencyListActive && (
                <CurrencyList
                  isActive={this.state.currencyListActive}
                  currencySymbol={this.state.currency}
                  selectCurrency={this.props.selectCurrency}
                />
              )}
            </div>
          </OutsideClickHandler>
          {this.props.itemsQuantity ? (
            <div className="cart-items-quantity">
              {this.props.itemsQuantity}
            </div>
          ) : (
            <></>
          )}
          <img src={emptyCart} alt="cart" className="actions-cart" />
          <CartOverlay
            cart={this.props.cart}
            currency={this.props.selectedCurrency}
            removeFromCart={this.props.removeFromCart}
            addToCart={this.props.addToCart}
            itemsQuantity={this.props.itemsQuantity}
          />
        </div>
      </header>
    );
  }
}

export default Header;
