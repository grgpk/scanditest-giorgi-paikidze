import React from "react";
import "./Attributes.css";

export class Attributes extends React.Component {
  constructor() {
    super();
    this.state = {
      isSelected: false,
    };
  }

  render() {
    // getting props from PDP
    const { attributes, selectAttribute } = this.props;
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
                      <button
                        onClick={() => {
                          selectAttribute({ ...item, type });
                          this.setState({ isSelected: true });
                        }}
                        className="attribute-btn"
                        key={item.id}
                        // swatch types should display its value as color
                        style={{
                          backgroundColor: !this.state.isSelected
                            ? item.value
                            : "#8B9395",
                        }}
                      >
                        {type !== "swatch" && item.value}
                      </button>
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
