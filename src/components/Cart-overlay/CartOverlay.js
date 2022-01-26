import React from "react";
// import { Link } from "react-router-dom";
import classes from "./CartOverlay.module.css";
import { CartItems } from "../Cart-items/CartItems";
import { Link } from "react-router-dom";

class CartOverlay extends React.Component {
  render() {
    const { cart, currency, addToCart, removeFromCart, itemsQuantity } =
      this.props;
    return (
      <div className={classes.cartOverlay}>
        <h5>
          My Bag,
          <span className={classes.itemsQuantity}> {itemsQuantity} items</span>
        </h5>
        <div className={classes.cartItems}>
          <CartItems
            classes={classes}
            cart={cart}
            currency={currency}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        </div>
        <div className={classes.totalPrice}>
          <p>Total</p>
          <p>$100</p>
        </div>
        <div className={classes.cartOverlayBtns}>
          <Link to={"/cart"}>
            <button className={classes.btnBag}>VIEW BAG</button>
          </Link>
          <button className={classes.btnCheckout}>CHECK OUT</button>
        </div>
      </div>
    );
  }
}

export default CartOverlay;
