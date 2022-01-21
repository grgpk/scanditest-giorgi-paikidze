import React from "react";
import { queryProduct } from "../../graphql/QueryProduct";
import { client } from "../../graphql/QueryCategories";
import "./PDP.css";

export class PDP extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
    };
  }

  componentDidMount() {
    console.log(this.props.id);
    client
      .query({
        query: queryProduct,
        variables: {
          id: this.props.id,
        },
      })
      .then((data) => this.setState({ product: data.data.product }));
  }

  render() {
    const product = this.state.product;
    return (
      <div className="pdp-container">
        <div className="pdp-image">
          <img src={product.gallery} alt={product.name} />
        </div>
        <div className="pdp-info">
          <h3>{product.name}</h3>
          <div>size</div>
          <div>price</div>
          <button>Add to cart</button>
          <p>{product.description}</p>
        </div>
      </div>
    );
  }
}
