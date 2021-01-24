import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: 'Cheese', name: 'cheese'},
    {label: 'Meat', name: 'meat'},
    {label: 'Salad', name: 'salad'},
    {label: 'Bacon', name: 'bacon'},
]

const buildControls = (props) => (
    <div className= {classes.BuildControls} >
    <p>Your Burger Price: {props.price.toFixed(2)} </p>
      {controls.map(ctrl => (
        <BuildControl 
         ingredientLabel= {ctrl.label}
         key={ctrl.label}
         added= {() => props.ingredientAdded(ctrl.name)}
         removed= {() => props.ingredientRemoved(ctrl.name)} 
         disableBtn = {props.disabled[ctrl.name]}    /> 
      ))}
      <button 
        className= {classes.OrderButton}
        disabled= {!props.purchasable}
        onClick= {props.ordered} >
        {props.auth ? 'ORDER NOW' : 'SIGNUP TO ORDER' } 
       </button>
    </div>
);

export default buildControls;