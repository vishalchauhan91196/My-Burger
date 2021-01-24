import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.entries(props.ingredients)
            .map(igKey => {
                return [...Array(igKey[1])].map((_, i) => {
                  return <BurgerIngredient key= {igKey[0] + i} type= {igKey[0]} />
                })
            }).reduce((acc, currEl) => {
                return acc.concat(currEl);
            },[]);
    
        if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add ingredients!</p>
        }
   
    
    return (
        <div className= {classes.Burger} >
            <BurgerIngredient type= {'bread-top'} />
            {transformedIngredients}
            <BurgerIngredient type= {'bread-bottom'} />
        </div>
    );
};

export default burger;