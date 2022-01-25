import React from "react";
import { queryProduct } from "../../graphql/QueryProduct";
import { client } from "../../graphql/QueryCategories";
import { Attributes } from "../Attributes/Attributes";
import queryString from "query-string";
import "./PDP.css";

export class PDP extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      currency: [],
    };
  }

  componentDidMount() {
    let url = window.location.pathname;
    let params = queryString.parse(url);
    client
      .query({
        query: queryProduct,
        variables: {
          id: params["/product/id"],
        },
      })
      .then((data) =>
        this.setState({
          product: data.data.product,
          currency: data.data.product.prices,
        })
      );
  }

  render() {
    const { gallery, name, description, id, brand } = this.state.product;
    const currency = this.state.currency;
    const img = gallery ? gallery[0] : null;
    let price;
    return (
      <div className="pdp-container">
        <div className="pdp-image">
          {gallery ? <img src={img} alt={name} /> : <></>}
        </div>
        <div className="pdp-info">
          <h1 className="product-brand">{brand}</h1>
          <p className="product-name">{name}</p>

          {id ? <Attributes id={id} /> : <></>}
          <div className="pdp-price">
            <h3>PRICE:</h3>

            {currency[0]
              ? currency.map((el, idx) => {
                  if (el.currency === this.props.currency.selectedCurrency) {
                    price = el.amount;
                    return (
                      <div
                        className="price"
                        key={idx}
                      >{`${this.props.currency.selectedCurrencySymbol} ${price}`}</div>
                    );
                  }
                  return undefined;
                })
              : null}
          </div>
          <button
            className="pdp-info-btn"
            onClick={() => {
              this.props.addToCart({ img, name, id, price, brand });
            }}
          >
            Add to cart
          </button>
          <div
            className="product-description"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
      </div>
    );
  }
}
