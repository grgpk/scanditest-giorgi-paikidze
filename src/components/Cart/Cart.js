import React from "react";
import "./Cart.css";

export class Cart extends React.Component {
  render() {
    const { currency } = this.props;
    return (
      <div>
        <h1>Cart</h1>
        <div>
          {this.props.cart.length === 0 && (
            <div>Cart is Empty!!! please add products</div>
          )}
        </div>
        {this.props.cart.map((product) => {
          return (
            <div key={product.id} className="cart-item">
              <div>
                <h3>{product.brand}</h3>
                <p className="product-name">{product.name}</p>
                <p className="product-price">
                  {product.prices
                    ? product.prices.map((price) => {
                        if (price.currency === currency.selectedCurrency) {
                          return `${currency.selectedCurrencySymbol} ${(
                            price.amount * product.count
                          ).toFixed(2)}`;
                        }
                        return null;
                      })
                    : null}
                </p>
              </div>
              <div className="cart-item-modify">
                <div className="cart-item-btn">
                  <button
                    onClick={() => this.props.addToCart(product)}
                    className="btn-plus"
                  >
                    +
                  </button>
                  <p className="cart-item-quantity">{product.count}</p>
                  <button
                    onClick={() => this.props.removeFromCart(product)}
                    className="btn-minus"
                  >
                    -
                  </button>
                </div>
                <img
                  src={product.img}
                  alt={product.name}
                  className="cart-img"
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
