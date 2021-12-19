import React from "react";
import "./Navigation.css";
import Category from "../Category/Category";

class Navigation extends React.Component {
  render() {
    return (
      <nav className="nav">
        <Category />
      </nav>
    );
  }
}
export default Navigation;
