import React from "react";
import "./Attributes.css";

export class Attributes extends React.Component {
  render() {
    const { attributes, selectAttribute } = this.props;
    return (
      <div>
        {attributes.map((attr) => {
          return (
            <div className="attributes" key={attr.id}>
              <h3 className="attribute-name">{attr.name}:</h3>
              <div className="attribute-item">
                {attr.items && (
                  attr.items.map((item) => {
                    return (
                      <button
                        onClick={() => selectAttribute(item)}
                        className="attribute-btn"
                        key={item.id}
                        style={{ backgroundColor: item.value }}
                      >
                        {attr.type !== "swatch" && item.value}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
