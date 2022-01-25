import React from "react";
import { client } from "../../graphql/QueryCategories";
import { queryAttributes } from "../../graphql/QueryAttributes";
import "./Attributes.css";

export class Attributes extends React.Component {
  constructor() {
    super();
    this.state = {
      attributes: [],
    };
  }

  componentDidMount() {
    client
      .query({
        query: queryAttributes,
        variables: { id: this.props.id },
      })
      .then((attributes) => {
        this.setState({ attributes: attributes.data.product.attributes });
      });
  }

  render() {
    const attributes = this.state.attributes;
    if (attributes !== []) {
      return (
        <div>
          {attributes.map((attr) => {
            return (
              <div className="attributes" key={attr.id}>
                <h3 className="attribute-name">{attr.name}:</h3>
                <div className="attribute-item">
                  {attr.items ? (
                    attr.items.map((item) => {
                      return (
                        <button
                          className="attribute-btn"
                          key={item.id}
                          style={{ backgroundColor: item.value }}
                        >
                          {attr.type !== "swatch" ? item.value : null}
                        </button>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  }
}
