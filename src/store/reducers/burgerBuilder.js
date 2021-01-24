import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 30,
    error: false,
    building: false,
}

const INGREDIENT_PRICES= {
    salad: 20,
    meat: 50,
    cheese: 20,
    bacon: 25,
}

const reducer = (state= initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT :   
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice +          
                            INGREDIENT_PRICES[action.ingredientName],
                building: true    
            };
        case actionTypes.REMOVE_INGREDIENT :
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice -      
                            INGREDIENT_PRICES[action.ingredientName],
                building: true    
            };
        case actionTypes.SET_INGREDIENTS :
            return{
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    cheese: action.ingredients.cheese,
                    bacon: action.ingredients.bacon,
                    meat: action.ingredients.meat,
                },
                error: false,
                totalPrice: 30,
                building: false    
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED :
            return{
                ...state,
                error: true
            };    
        default:
            return state;
    }
}

export default reducer;