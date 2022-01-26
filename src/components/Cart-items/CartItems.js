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
