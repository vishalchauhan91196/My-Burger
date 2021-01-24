import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';


class BurgerBuilder extends Component{
    state = {
        purchasing: false,
        loading: false,
    }
    
    componentDidMount(){
        this.props.toInitIngredients();
    }
    
    updatePurchaseState = (ingredients) =>{
        const sum= Object.values(ingredients)
            .reduce((acc, curEl) => {
                return acc + curEl;                
            }, 0);
        return sum>0; 
    }
    
    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        } else {
            this.props.toSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');    
        }
    }
    
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    
    purchaseContinueHandler = () => {
       // alert('You continued !!');
        this.props.toInitPurchase();
        this.props.history.push('/checkout');              
    }
    
    render(){
        const disabledInfo= {...this.props.ings};
        for(const key in disabledInfo){
            disabledInfo[key]= disabledInfo[key]<=0;
        }
        //  disabledInfo={meat: true, bacon: true, cheese: false, salad: false}
        
        let orderSummary = null;
            
        let burger= this.props.error ? <p> Something went wrong. Cannot load ingredients. </p> : <Spinner />
        if(this.props.ings){
           burger= (
            <Aux>   
            <Burger ingredients = {this.props.ings} />
                <BuildControls 
                    ingredientAdded= {this.props.toAddIngredient}
                    ingredientRemoved= {this.props.toRemoveIngredient} 
                    disabled= {disabledInfo}   
                    price= {this.props.price}
                    auth= {this.props.isAuthenticated}
                    purchasable= {this.updatePurchaseState(this.props.ings)}
                    ordered= {this.purchaseHandler} />
            </Aux >   
            )  
           
           orderSummary = <OrderSummary ingredients= {this.props.ings}
                        amount= {this.props.price}
                        cancel= {this.purchaseCancelHandler}
                        continue= {this.purchaseContinueHandler}  />  
        }    
           
        if(this.state.loading){
            orderSummary = <Spinner />
        }   
        
        return(
            <Aux>
                <Modal show= {this.state.purchasing} 
                       modalClosed= {this.purchaseCancelHandler} >  
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }  
}

        
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice, 
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !==null    
    };
} 
        
const mapDispatchToProps = dispatch => {
    return {
        toAddIngredient: (igName) => dispatch(actions.addIngredient(igName)),
        toRemoveIngredient: (igName) => dispatch(actions.removeIngredient(igName)),
        toInitIngredients: () => dispatch(actions.initIngredients()),
        toInitPurchase: () => dispatch(actions.purchaseInit()),
        toSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
        
    };
}        
        
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));