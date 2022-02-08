import React from "react";
import Attribute from "../Attribute/Attribute";
import "./Attributes.css";

export class Attributes extends React.Component {
  render() {
    // getting props from PDP
    const { attributes, selectAttribute, removeAttribute } = this.props;
    return (
      <div>
        {/* loop through attributes array to render them */}
        {attributes.map((attr) => {
          const type = attr.type;
          return (
            <div className="attributes" key={attr.id}>
              <h3 className="attribute-name">{attr.name}:</h3>
              <div className="attribute-item">
                {attr.items &&
                  // loop through each attribute items
                  attr.items.map((item) => {
                    return (
                      <Attribute
                        selectAttribute={selectAttribute}
                        item={item}
                        type={type}
                        key={item.id}
                        product={this.props.product}
                        removeAttribute={removeAttribute}
                      />
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
