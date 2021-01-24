import React from 'react';

import classes from './BuildControl.css'

const buildControl = (props) => (
    <div className= {classes.BuildControl} >
        <div className= {classes.Label}> {props.ingredientLabel} </div>
        <button 
            className= {classes.Less}
            onClick= {props.removed} 
            disabled= {props.disableBtn} >LESS</button>
        <button 
            className= {classes.More}
            onClick= {props.added} >MORE</button> 
    </div>
);

export default buildControl;