import React from "react";
import "./Category.css";
import { GET_CATEGORY } from "../../graphql/GetCategory";

class Category extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [{ name: "all" }],
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

  render() {
    return (
      <ul className="nav-list">
        {this.state.categories.map((item) => {
          return (
            <li key={item.name} className="nav-list-item">
              <a href={item.name}>{item.name}</a>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Category;
