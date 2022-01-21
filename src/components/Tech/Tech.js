import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { queryCategory } from "../../graphql/QueryCategory";
import { client } from "../../graphql/QueryCategories";

class Tech extends React.Component {
  constructor() {
    super();
    this.state = {
      tech: [],
    };
  }

  componentDidMount() {
    client
      .query({ query: queryCategory, variables: { category: "tech" } })
      .then((data) => {
        this.setState({ tech: data.data.category.products });
      });
  }

  render() {
    return (
      <section>
        <h1 className="category-title">Tech</h1>
        <div className="product-card-container">
          {this.state.tech.map((item) => {
            const currency = item.prices.filter(
              (el) => el.currency === this.props.currency.selectedCurrency
            );
            return (
              <ProductCard
                key={item.id}
                id={item.id}
                img={item.gallery[0]}
                name={item.name}
                price={`${this.props.currency.selectedCurrencySymbol} ${currency[0].amount}`}
              />
            );
          })}
        </div>
      </section>
    );
  }
}

export default Tech;
