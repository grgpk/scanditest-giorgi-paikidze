import React from "react";
import "./Navigation.css";
import { NavLink } from "react-router-dom";
import { client, queryCategories } from "../../graphql/QueryCategories";

class Navigation extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [{ name: "all" }],
    };
  }

  componentDidMount() {
    client.query({ query: queryCategories }).then((data) =>
      this.setState((prevState) => {
        return {
          categories: [...prevState.categories, ...data.data.categories],
        };
      })
    );
  }
  render() {
    return (
      <nav className="nav">
        <ul className="nav-list">
          {/* just renders category names/links in navigation */}
          {this.state.categories.map((item) => {
            return (
              <NavLink
                to={item.name}
                key={item.name}
                className="nav-list-item"
                activeclassname="active"
              >
                {item.name}
              </NavLink>
            );
          })}
        </ul>
      </nav>
    );
  }
}
export default Navigation;
