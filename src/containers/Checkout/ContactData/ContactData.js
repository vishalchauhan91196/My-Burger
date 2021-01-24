import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './ContactData.css';

import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Form/Input/Input';
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends Component{
    state= {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid: false,
                touched: false,
            } ,
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid: false,
                touched: false,
            },
            area: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Area'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid: false,
                touched: false,
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid: false,
                touched: false,
            },
            pincode: {
                elementType: 'input',
                elementConfig: {
                    type: 'postal',
                    placeholder: 'PIN code',
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6,
                    maxLength: 6,
                    isNumeric: true
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail ID'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
            } ,
            deliveryMode: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
                touched: false,
            } 
        },
        
        formIsValid: false,
    }
        
    placeOrderHandler= (e) =>{
        e.preventDefault();
        this.setState({loading: true});
        const formData= {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]= this.state.orderForm[formElementIdentifier].value;
        }
        
        const order= {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        
        this.props.onOrderBurger(order, this.props.token);
    }    
    
    checkInputValidation(value, rules) {
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid= value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid= value.length <= rules.maxLength && isValid;
        }
        if(rules.isEmail){
            const pattern= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 
            isValid= value.match(pattern) && isValid;
        }
        if(rules.isNumeric){
            const pattern= /^\d+$/; 
            isValid= value.match(pattern) && isValid;
        }
        
        return isValid;
    }
        
    inputChangeHandler= (e, inputIdentifier) => {
        const updatedOrderForm= {
           ...this.state.orderForm
        };
        
        const updatedFormElement= {
            ...updatedOrderForm[inputIdentifier]
        };
        
        updatedFormElement.value= e.target.value;
        updatedFormElement.valid= this.checkInputValidation(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched= true;
        updatedOrderForm[inputIdentifier]= updatedFormElement;
          
        let formIsValid= true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid= updatedOrderForm[inputIdentifier].value && formIsValid;
        }
      
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }
    
    render(){
        
        const formElementsArray = [];
            for(let key in this.state.orderForm){
                formElementsArray.push({
                    id: key,
                    config: this.state.orderForm[key]
                })
            }
//        console.log(formElementsArray);
        
        let form = (
            <form onSubmit= {this.placeOrderHandler} > 
                {formElementsArray.map(formElement => (
                <Input 
                    key= {formElement.id}    
                    elementType= {formElement.config.elementType}
                    elementConfig= {formElement.config.elementConfig}
                    value= {formElement.config.value}
                    changed= {(e) => this.inputChangeHandler(e, formElement.id)}
                    invalid={!formElement.config.valid}
                    shouldValidate= {formElement.config.validation}
                    touched= {formElement.config.touched} 
                    valueType= {formElement.id}    />
                ))}
            
                <Button btnType= 'Success' disableBtn= {!this.state.formIsValid} > PLACE ORDER </Button>
            </form>
        );
        if(this.props.loading){
          form= <Spinner />
        }
        
        return(
            <div className= {classes.ContactData} >
                <h3> Enter your contact details </h3>
                {form}
            </div>
        )
    }    
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));