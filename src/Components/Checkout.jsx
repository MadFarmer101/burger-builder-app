import React, { Component } from "react";
import { connect } from "react-redux";
import CheckoutSummary from "./CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData";

class Checkout extends Component {
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  confirmCheckoutHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/"/>;
    const purchaseFinalized = this.props.purchased ? <Redirect to="/" /> : null
    if (this.props.ings) {
      summary = (
        <div>
          {purchaseFinalized}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.cancelCheckoutHandler}
            checkoutConfirmed={this.confirmCheckoutHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerReducer.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
