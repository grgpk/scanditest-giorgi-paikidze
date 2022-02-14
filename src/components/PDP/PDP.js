import React from "react";
import { queryProduct } from "../../graphql/QueryProduct";
import { client } from "../../graphql/QueryCategories";
import { Attributes } from "../Attributes/Attributes";
import queryString from "query-string";
import "./PDP.css";

export class PDP extends React.Component {
  constructor(props) {
    super(props);
    this.url = window.location.pathname;
    this.id = queryString.parse(this.url)["/product/id"];
    this.product =
      this.props.cart.length > 0
        ? JSON.parse(localStorage.getItem("cart")).find(
            (el) => el.id === this.id
          )
        : null;
    this.state = {
      product: {},
      currency: [],
      selectedAttributes: this.product ? this.product.selectedAttributes : [],
    };
  }

  componentDidMount() {
    // Split url string to get product ID and query the product of the same ID
    client
      .query({
        query: queryProduct,
        variables: {
          id: this.id,
        },
      })
      .then((data) =>
        this.setState({
          product: data.data.product,
          currency: data.data.product.prices,
        })
      );
  }

  // Method to select attributes and push them into the array of "selectedAttributes"
  selectAttribute = (attribute) => {
    const attr = this.state.selectedAttributes.find(
      (item) => item.id === attribute.id
    );
    if (!attr) {
      this.setState((prevState) => {
        return {
          selectedAttributes: [...prevState.selectedAttributes, attribute],
        };
      });
    }
  };

  removeAttribute = (attribute) => {
    this.setState((prevState) => {
      return {
        selectedAttributes: prevState.selectedAttributes.filter(
          (el) => el.id !== attribute.id
        ),
      };
    });
  };

  render() {
    const { selectedAttributes } = this.state;
    const {
      gallery,
      name,
      description,
      id,
      brand,
      prices,
      attributes,
      inStock,
    } = this.state.product;
    const currency = this.state.currency;

    // Getting image url into img variable
    const img = gallery && gallery[0];

    return (
      <div className="pdp-container">
        <div className="pdp-gallery">
          {gallery &&
            gallery.map((img, idx) => {
              return (
                <img
                  src={img}
                  alt={name}
                  key={idx}
                  className="pdp-gallery-img"
                />
              );
            })}
        </div>
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
              removeAttribute={this.removeAttribute}
              selectedAttributes={this.state.selectedAttributes}
              product={this.product}
            />
          )}
          <div className="pdp-price">
            <h3>PRICE:</h3>
            {/* looping through array of currencies and getting selected currency and amount */}
            {currency[0] &&
              currency.map((el, idx) => {
                if (el.currency === this.props.currency.selectedCurrency) {
                  return (
                    <div
                      className="price"
                      key={idx}
                    >{`${this.props.currency.selectedCurrencySymbol} ${el.amount}`}</div>
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
                attributes,
                inStock,
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
