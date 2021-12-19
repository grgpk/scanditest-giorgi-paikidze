import React from "react";
import "./ProductCard.css";

export default class ProductCard extends React.Component {
  render() {
    const { img, price, name } = this.props;
    return (
      <div className="product-card">
        <img src={img} alt={name} />
        <div className="product-card__content">
          <p>{name}</p>
          <p>{price}</p>
        </div>
      </div>
    );
  }
}
