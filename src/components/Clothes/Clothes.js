import React from "react";
import { client } from "../../graphql/QueryCategories";
import { queryCategory } from "../../graphql/QueryCategory";
import ProductCard from "../ProductCard/ProductCard";

class Clothes extends React.Component {
  constructor() {
    super();
    this.state = {
      clothes: [],
    };
  }

  componentDidMount() {
    client
      .query({ query: queryCategory, variables: { category: "clothes" } })
      .then((data) => {
        this.setState({ clothes: data.data.category.products });
      });
  }

  render() {
    return (
      <section>
        <h1 className="category-title">Clothes</h1>
        <div className="product-card-container">
          {this.state.clothes.map((item) => {
            const currency = item.prices.filter(
              (el) => el.currency === this.props.currency.selectedCurrency
            );
            return (
              <ProductCard
                addToCart={this.props.addToCart}
                key={item.id}
                id={item.id}
                img={item.gallery[0]}
                brand={item.brand}
                name={item.name}
                price={`${this.props.currency.selectedCurrencySymbol} ${currency[0].amount}`}
                prices={item.prices}
                attributes={item.attributes}
                inStock={item.inStock}
              />
            );
          })}
        </div>
      </section>
    );
  }
}

export default Clothes;
