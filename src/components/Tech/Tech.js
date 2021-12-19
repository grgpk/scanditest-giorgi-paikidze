import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { GET_TECH } from "../../graphql/GetTech";

class Tech extends React.Component {
  constructor() {
    super();
    this.state = {
      tech: [],
    };
  }

  componentDidMount() {
    GET_TECH.then((data) =>
      this.setState({ tech: data.data.categories[1].products })
    );
  }

  render() {
    return (
      <section>
        <h1 className="category-title">Tech</h1>
        <div className="product-card-container">
          {this.state.tech.map((item) => (
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

export default Tech;
