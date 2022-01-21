import React from "react";
import { client } from "../../graphql/QueryCategories";
import { queryAllProducts } from "../../graphql/QueryAllProducts";
import ProductCard from "../ProductCard/ProductCard";
import "./AllCategory.css";

class AllCategory extends React.Component {
  constructor() {
    super();
    this.state = {
      allProducts: [],
    };
  }

  componentDidMount() {
    client
      .query({
        query: queryAllProducts,
      })
      .then((data) =>
        this.setState({ allProducts: data.data.category.products })
      );
  }

  render() {
    return (
      <section>
        <h1 className="category-title">All Products</h1>
        <div className="product-card-container">
          {this.state.allProducts.map((item) => {
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

export default AllCategory;
