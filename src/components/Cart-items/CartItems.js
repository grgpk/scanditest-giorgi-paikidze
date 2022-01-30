import React from "react";
import "./CartItems.css";

export class CartItems extends React.Component {
  render() {
    const { cart, currency, addToCart, removeFromCart, classes } = this.props;
    return (
      <div>
        {cart.length === 0 && (
          <div className={classes.emptyCart}>
            Cart is Empty!!! please add products
          </div>
        )}

        {cart.map((product) => {
          return (
            <div key={product.id} className={classes.cartItem}>
              <div className={classes.productInfo}>
                <h3 className={classes.productBrand}>{product.brand}</h3>
                <p className={classes.productName}>{product.name}</p>
                <p className={classes.productPrice}>
                  {/* get selected currency and its amount to display in the cart */}
                  {product.prices &&
                    product.prices.map((price) => {
                      if (price.currency === currency.selectedCurrency) {
                        return `${
                          currency.selectedCurrencySymbol
                        } ${price.amount.toFixed(2)}`;
                      }
                      return null;
                    })}
                </p>
                <div className={classes.attributeContainer}>
                  {/* display selected attributes in the cart and mini cart */}
                  {product.selectedAttributes.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className={classes.attribute}
                        style={{ background: item.value }}
                      >
                        {item.type !== "swatch" && item.value}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={classes.cartItemModify}>
                <div className={classes.cartItemBtn}>
                  <button
                    onClick={() => addToCart(product)}
                    className={classes.btnPlus}
                  >
                    +
                  </button>
                  <p className={classes.cartItemQuantity}>{product.count}</p>
                  <button
                    onClick={() => removeFromCart(product)}
                    className={classes.btnMinus}
                  >
                    -
                  </button>
                </div>
                <img
                  src={product.img}
                  alt={product.name}
                  className={classes.cartImg}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
