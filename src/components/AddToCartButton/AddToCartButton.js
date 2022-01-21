import React from "react";
import "./AddToCartButton.css";

export class AddToCartButton extends React.Component {
  render() {
    return (
      <div
        className="add-to-cart-btn"
        onClick={(e) => {
          e.preventDefault();
        }}
      ></div>
    );
  }
}
