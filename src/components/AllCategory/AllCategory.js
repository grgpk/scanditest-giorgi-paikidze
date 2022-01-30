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

  // Query all products and update the state
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
        <h1 className="category-title">All</h1>
        <div className="product-card-container">
          {this.state.allProducts.map((item) => {
            // getting the selected currency and corresponding amount 
            const currency = item.prices.filter(
              (el) => el.currency === this.props.currency.selectedCurrency
            );
            return (
              // render ProductCart for each product
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
              />
            );
          })}
        </div>
      </section>
    );
  }
}

export default AllCategory;
