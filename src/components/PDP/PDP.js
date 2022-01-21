import React from "react";
import { queryProduct } from "../../graphql/QueryProduct";
import { client } from "../../graphql/QueryCategories";
import queryString from "query-string";
import "./PDP.css";

export class PDP extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
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
        })
      );
  }

  render() {
    const product = this.state.product;
    // console.log(product.prices);
    // console.log(this.props.currency);
    // console.log(currency[0]);
    return (
      <div className="pdp-container">
        <div className="pdp-image">
          <img src={product.gallery} alt={product.name} />
        </div>
        <div className="pdp-info">
          <h2>{product.name}</h2>
          <div>size</div>
          <div>
            <strong>PRICE</strong>
            <div>
              {`${this.props.currency.selectedCurrencySymbol}`}
            </div>
          </div>
          <button>Add to cart</button>
          <div
            className="product-description"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
        </div>
      </div>
    );
  }
}
