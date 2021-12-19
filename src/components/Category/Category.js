import React from "react";
import { NavLink } from "react-router-dom";
import "./Category.css";
import { GET_CATEGORY } from "../../graphql/GetCategory";

class Category extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [{ name: "all" }],
      active: false,
    };
  }

  componentDidMount() {
    GET_CATEGORY.then((data) =>
      this.setState((prevState) => {
        return {
          categories: [...prevState.categories, ...data.data.categories],
        };
      })
    );
  }

  // navLinkClick = () => {
  //   this.setState((prev) => {
  //     return {
  //       active: !prev.active,
  //     };
  //   });
  // };

  render() {
    return (
      <ul className="nav-list">
        {this.state.categories.map((item) => {
          return (
            <NavLink
              // onClick={this.navLinkClick}
              to={item.name}
              key={item.name}
              className={
                this.state.active ? "nav-list-item__clicked" : "nav-list-item"
              }
            >
              {item.name}
            </NavLink>
          );
        })}
      </ul>
    );
  }
}

export default Category;
