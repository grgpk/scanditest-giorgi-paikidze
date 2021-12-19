import React from "react";
import { GET_CLOTHES } from "../../graphql/GetClothes";
import ProductCard from "../ProductCard/ProductCard";

class Clothes extends React.Component {
  constructor() {
    super();
    this.state = {
      clothes: [],
    };
  }

  componentDidMount() {
    GET_CLOTHES.then((data) =>
      this.setState({ clothes: data.data.categories[0].products })
    );
  }

  render() {
    return (
      <section>
        <h1 className="category-title">Clothes</h1>
        <div className="product-card-container">
          {this.state.clothes.map((item) => (
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

export default Clothes;
