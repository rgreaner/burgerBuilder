import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
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
        purchasable: false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients ).map( igKey => {
            return ingredients[igKey];
            //Returning an array of the amount of the ingredients. (The numbers in the ingredients object).
        } ).reduce( ( sum, el ) => {
            //sum is the constantly updated current sum up until the current iteration where this function is executed. Once the func is executed on all array elements sum is the final result.
            return sum + el;
            //Return the current sum plus the element. Elements is a number because it is the value accesed in ingredients[igKey]. 

            //Sum constant is 0 if no ingredients are added or any other number representing the total amount of ingredients.
        }, 0 );

        this.setState( { purchasable: sum > 0 } );
        //If the sum is over 0, the state of purchasable changes to true.

    }

    addIngredientHandler = ( type ) => {
            const oldCount = this.state.ingredients[type];
            const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

            const priceAddition = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = ( type ) => {
            const oldCount = this.state.ingredients[type];
            if ( oldCount <= 0 ) {
                return;
            //No error if trying to remove an ingredient that is not there. (Not letting the state become -1).
            }
            const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

            const priceDeduction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);   
    }
    
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        //If the state is less than or equal to zero, disable the build control "less button." See BuildControl.js & BuildControls.js for more logic.
            //disabledInfo structure is {salad: true, meat: false, etc.}
        return(
            <Aux>
                <Modal>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                ingredientAdded={this.addIngredientHandler} 
                ingredientRemoved={this.removeIngredientHandler} 
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                price={this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;