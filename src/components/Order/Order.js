import React from 'react';

import classes from './Order.css';

const Order = (props) => {
    const ingredients= [];
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName],
        })
    }
//    console.log(ingredients);
    const ingredientOutput = ingredients.map(ing => {
        return <span 
                style= {{
                    textTransform: 'capitalize',
                    padding: '6px',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    display: 'inline-block'    
                    }}
                key = {ing.name} > {ing.name} ({ing.amount}) </span>
    })
    
    return(
        <div className= {classes.Order}> 
            <p>The ingredients of your burger are :</p>
            <p> {ingredientOutput} </p>
            <p>Your burger costs  &nbsp;<strong>  Rs {props.price.toFixed(2)} </strong> </p>
        </div>
    )
};

export default  Order;