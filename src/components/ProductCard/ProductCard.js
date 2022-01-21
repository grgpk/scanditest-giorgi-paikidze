import React from "react";
import { Link } from "react-router-dom";
import { AddToCartButton } from "../AddToCartButton/AddToCartButton";
import "./ProductCard.css";

export default class ProductCard extends React.Component {
  render() {
    const { img, price, name, id } = this.props;
    return (
      <Link to={`/product/id=${id}`} className="product-link">
        <div className="product-card">
          <img src={img} alt={name} />
          <AddToCartButton />
          <div className="product-card__content">
            <p>{name}</p>
            <p>{price}</p>
          </div>
        </div>
      </Link>
    );
  }
}
