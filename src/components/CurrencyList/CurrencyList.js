import React from "react";
import { client } from "../../graphql/QueryCategories";
import { queryCurrency } from "../../graphql/QueryCurrency";
import "./CurrencyList.css";

export default class CurrencyList extends React.Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
    };
  }

  componentDidMount() {
    client
      .query({ query: queryCurrency })
      .then((data) => this.setState({ currencies: data.data.currencies }));
  }

  render() {
    const { currencySymbol, selectCurrency } = this.props;
    return (
      <div className="currency-list">
        {this.state.currencies.map((currency) => {
          return (
            <div
              key={currency}
              className="currency-list-item"
              onClick={selectCurrency}
            >
              {/* get currency abbreviation (like USD) and render its symbol and abbreviation */}
              {`${currencySymbol[currency]} ${currency}`}
            </div>
          );
        })}
      </div>
    );
  }
}
