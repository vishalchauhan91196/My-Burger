import React from 'react';

import Aux from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.entries(props.ingredients).map(ig => {
     return <li key={ig[0] + ig[1]} >
            <span style= {{textTransform: 'capitalize'}}>{ig[0]}</span>: {ig[1]} 
            </li>
    })
        
    return(
        <Aux>
            <h3> Your Order! </h3>
            <p> A delicious burger with the following ingredients: </p>
            <ul> 
                {ingredientSummary}
            </ul>
            <p><strong> Total Amount: {props.amount.toFixed(2)} </strong></p>
            <p>Continue to CheckOut? </p>
        <Button btnType='Danger' clicked={props.cancel} >CANCEL</Button>
        <Button btnType='Success' clicked={props.continue} >CONTINUE</Button>
        </Aux>
    )
    };

export default orderSummary;