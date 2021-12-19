import React from "react";
import { GET_ALL_PRODUCTS } from "../../graphql/GetProduct";
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
    GET_ALL_PRODUCTS.then((data) =>
      this.setState({ allProducts: data.data.category.products })
    );
  }

  render() {
    return (
      <section >
        <h1 className="category-title">All Products</h1>
        <div className="product-card-container">
          {this.state.allProducts.map((item) => (
            <ProductCard
              key={item.id}
              img={item.gallery[0]}
              name={item.name}
              price={"$50.00"}
            />
          ))}
        </div>
      </section>
    );
  }
}

export default AllCategory;
