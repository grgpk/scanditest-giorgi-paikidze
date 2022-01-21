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
      })
      .catch((err) => console.log(err));
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

export default Clothes;
