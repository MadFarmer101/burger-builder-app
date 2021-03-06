import React, { Component } from "react";
import { connect } from "react-redux";
import Burger from "./Burger";
import BuildControls from "./BuildControls";
import Modal from "./Modal";
import OrderSummary from "./OrderSummary";
import axios from "../axios-orders";
import Spinner from "./Spinner";
import withErrorHandler from "./withErrorHandler";
import * as actionCreators from "../store/actions/index";

export class BurgerBuilder extends Component {
  state = {
    ordering: false,
  };

  componentDidMount() {
    this.props.onFetchIngredients();
  }

  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({ ordering: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  cancelPurchaseHandler = () => {
    this.setState({ ordering: false });
  };

  confirmPurchaseHandler = () => {
    this.props.onPurchaseInit();
    this.props.history.push("/checkout");
  };

  updatePurchasable = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  render() {
    const disabledButton = {
      ...this.props.ings,
    };

    for (let key in disabledButton) {
      disabledButton[key] = disabledButton[key] <= 0;
    }

    let orderSummary;

    let burger = this.props.error ? (
      <p>Error loading ingredients!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            addedIngredient={this.props.onIngredientAdded}
            removedIngredient={this.props.onIngredientRemoved}
            disabled={disabledButton}
            totalPrice={this.props.price}
            purchasable={this.updatePurchasable(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuth}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          totalPrice={this.props.price}
          cancelPurchase={this.cancelPurchaseHandler}
          confirmPurchase={this.confirmPurchaseHandler}
        />
      );
    }

    return (
      <>
        <Modal
          show={this.state.ordering}
          closeModal={this.cancelPurchaseHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice,
    error: state.burgerReducer.error,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(actionCreators.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actionCreators.removeIngredient(ingName)),
    onFetchIngredients: () => dispatch(actionCreators.fetchIngredients()),
    onPurchaseInit: () => dispatch(actionCreators.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actionCreators.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
