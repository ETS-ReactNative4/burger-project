import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchased: false // property to track click of order button
    };

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map((key) => {
            return ingredients[key];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({
            purchasable: sum > 0
        });
    }

    addIngredientHandler = (type) => {
        const newCount = this.state.ingredients[type] + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = newCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            totalPrice: newPrice, ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const newCount = this.state.ingredients[type] - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = newCount;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            totalPrice: newPrice, ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    };

    purchasedHandler = () => {
        this.setState({
            purchased: true
        });
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchased}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />

                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    orderButtonDisabled={this.state.purchasable}
                    order={this.purchasedHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;