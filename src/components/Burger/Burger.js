import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        //Extracting keys of a give obj & turning that into an array. --->Array of keys
        //Map then executes a function on each element in the array.
            //Transform the string value from igKey into an array with as many elements as there are ingredients for a given ingredient.
                //Ex: If I have 2 cheese ingredients, I want to transform that cheese string into an array with 2 elements. The element doesn't matter, just the length of the array.
        return [...Array(props.ingredients[igKey]
            //Make a new array with length of props.ingredients[igKey]. (Amount of the given ingredient)
            )].map((_, i) => {
                //_ is an arg name to indicate a blank, since the element itself doesn't matter. i is the index of the element.
            return <BurgerIngredient key={igKey + i} type={igKey} />;
            //Key--makes the unique key
                //Ex: key={igKey + i} equals key={cheese +1} equals key={cheese1}
            
        });
    });

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;