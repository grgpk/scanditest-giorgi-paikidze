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
      selectedAttributes: [],
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

  selectAttribute = (attribute) => {
    this.setState(
      (prevState) => {
        const attr = prevState.selectedAttributes.find(
          (item) => item.id === attribute.id
        );
        if (!attr) {
          return {
            selectedAttributes: [...prevState.selectedAttributes, attribute],
          };
        }
      },
      () => console.log(this.state.selectedAttributes)
    );
  };

  render() {
    const { selectedAttributes } = this.state;
    const { gallery, name, description, id, brand, prices, attributes } =
      this.state.product;
    const currency = this.state.currency;
    const img = gallery && gallery[0];
    let priceAmount;

    return (
      <div className="pdp-container">
        <div className="pdp-image">{<img src={img} alt={name} />}</div>
        <div className="pdp-info">
          <div>
            <h1 className="product-brand">{brand}</h1>
            <p className="product-name">{name}</p>
          </div>

          {attributes && (
            <Attributes
              attributes={attributes}
              selectAttribute={this.selectAttribute}
            />
          )}
          <div className="pdp-price">
            <h3>PRICE:</h3>

            {currency[0] &&
              currency.map((el, idx) => {
                if (el.currency === this.props.currency.selectedCurrency) {
                  priceAmount = el.amount;
                  return (
                    <div
                      className="price"
                      key={idx}
                    >{`${this.props.currency.selectedCurrencySymbol} ${priceAmount}`}</div>
                  );
                }
                return null;
              })}
          </div>
          <button
            className="pdp-info-btn"
            onClick={() => {
              this.props.addToCart({
                img,
                name,
                id,
                prices,
                brand,
                selectedAttributes,
              });
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
