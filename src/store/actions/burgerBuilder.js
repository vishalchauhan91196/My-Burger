import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (igName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: igName
    };
}

export const removeIngredient = (igName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: igName
    };
}

export const setIngredients = (ings) => {
    return{
        type: actionTypes.SET_INGREDIENTS, 
        ingredients: ings
    }
}

export const fetchIngredientsFailed = () => {
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://my-burger--react-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            })
    }
}