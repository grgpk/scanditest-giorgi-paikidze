import React, { Component } from "react";
import "./Attribute.css";

class Attribute extends Component {
  constructor(props) {
    super(props);
    this.attr =
      this.props.product &&
      this.props.product.selectedAttributes.find(
        (el) => el.id === this.props.item.id
      );
    this.state = {
      isSelected: this.attr ? true : false,
    };
  }

  render() {
    const { type, item, selectAttribute, removeAttribute } = this.props;
    const { isSelected } = this.state;
    return (
      <button
        onClick={() => {
          if (isSelected) {
            removeAttribute(item);
            this.setState({ isSelected: false });
            console.log("deselected");
          } else {
            selectAttribute({ ...item, type });
            this.setState({ isSelected: true });
            console.log("selected");
          }
        }}
        className="attribute-btn"
        // swatch types should display its value as color
        style={
          type === "swatch"
            ? {
                backgroundColor: item.value,
                color: "red",
                fontSize: "0.7rem",
              }
            : {
                backgroundColor: !isSelected
                  ? "white"
                  : "rgba(200, 200, 200, 1)",
              }
        }
      >
        {type !== "swatch" ? item.value : isSelected && "selected"}
      </button>
    );
  }
}

export default Attribute;
