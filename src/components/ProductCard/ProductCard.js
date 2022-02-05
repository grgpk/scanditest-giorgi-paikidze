import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

export default class ProductCard extends React.Component {
  render() {
    const { brand, img, price, name, id, prices, attributes, inStock } =
      this.props;
    return (
      <Link to={`/product/id=${id}`} className="product-link">
        <div className="product-card">
          {!inStock && <p className="out-of-stock">out of stock</p>}
          <img src={img} alt={name} />

          <button
            className="add-to-cart-btn"
            onClick={(e) => {
              e.preventDefault();

              this.props.addToCart({
                brand,
                img,
                prices,
                id,
                name,
                count: 0,
                selectedAttributes: [],
                attributes,
                inStock,
              });
            }}
          ></button>
          <div className="product-card__content">
            <p>{brand}</p>
            <p>{price}</p>
          </div>
        </div>
      </Link>
    );
  }
}
