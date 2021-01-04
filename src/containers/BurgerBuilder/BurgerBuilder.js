import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger.js";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
const ingredientAmount = {
  meat: 55,
  cheese: 100,
  salad: 80,
  bacon: 32,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: { meat: 0, cheese: 0, salad: 0, bacon: 0 },
    totalAmount: 0,
    orderProgress: 0,
  };

  orderButtonHandler = () => {
    this.setState({
      orderProgress: 1,
    });
  };

  addIngredientHandler = (type) => {
    const oldIngredients = { ...this.state.ingredients };
    oldIngredients[type] = oldIngredients[type] + 1;
    const oldAmount = this.state.totalAmount;

    this.setState({
      ingredients: oldIngredients,
      totalAmount: oldAmount + ingredientAmount[type],
    });
  };

  removeIngredientHandler = (type) => {
    const oldIngredients = { ...this.state.ingredients };
    if (oldIngredients[type] > 0) {
      oldIngredients[type] = oldIngredients[type] - 1;
      const oldAmount = this.state.totalAmount;
      this.setState({
        ingredients: oldIngredients,
        totalAmount: oldAmount - ingredientAmount[type],
      });
    }
  };

  render() {
    return (
      <Fragment>
        {this.state.orderProgress ? (
          <Modal>
            <OrderSummary ingredients={this.state.ingredients} />
          </Modal>
        ) : null}
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredients={this.state.ingredients}
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          totalAmount={this.state.totalAmount}
          orderProgress={this.orderButtonHandler}
        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
