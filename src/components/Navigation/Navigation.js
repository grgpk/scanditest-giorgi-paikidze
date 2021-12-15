import React from "react";
import "./Navigation.css";

class Navigation extends React.Component {
  render() {
    return (
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-list-item">
            <a href="#">Women</a>
          </li>
          <li className="nav-list-item">
            <a href="#">Men</a>
          </li>
          <li className="nav-list-item">
            <a href="#">Kids</a>
          </li>
        </ul>
      </nav>
    );
  }
}
export default Navigation;
