import React from "react";
import { CartItems } from "../Cart-items/CartItems";
import classes from "./Cart.module.css";

export class Cart extends React.Component {
  render() {
    const { cart, currency, addToCart, removeFromCart } = this.props;
    return (
      <div>
        <h1>Cart</h1>
        <CartItems
          classes={classes}
          cart={cart}
          currency={currency}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      </div>
    );
  }
}
