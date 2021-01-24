import React, {Component} from 'react';
import classes from './Auth.css';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Form/Input/Input';
import * as actions from '../../store/actions/index';


class Auth extends Component{
    state= {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
            } ,
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'current-password',
                    placeholder: 'Password',
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },  
        },
        formIsValid: false, 
        isSignUp: true,
    }    
    
    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/ '){
            this.props.onSetAuthRedirectPath();
        }
    }
    
    checkInputValidation(value, rules) {
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid= value.length >= rules.minLength && isValid;
        }
        if(rules.isEmail){
            const pattern= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 
            isValid= value.match(pattern) && isValid;
        }
        return isValid;
    }
        
    inputChangeHandler= (e, controlName) => {
        const updatedcontrols= {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value: e.target.value,
                valid: this.checkInputValidation(e.target.value, this.state.controls[controlName].validation),
                touched: true,
            }
        };
      
        let formIsValid= true;
        for(let controlName in updatedcontrols){
            formIsValid= updatedcontrols[controlName].valid && formIsValid;
        }
      
        this.setState({controls: updatedcontrols, formIsValid: formIsValid});
    }
    
    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }
    
    switchAuthModeHandler = () => {
        this.setState((prevState) => {
            return {isSignUp: !prevState.isSignUp};    
        });
    }
    
    render(){
        
        const formElementsArray = [];
            for(let key in this.state.controls){
                formElementsArray.push({
                    id: key,
                    config: this.state.controls[key]
                })
            }
        
        let form = (
            <div>
            <form onSubmit= {this.onSubmitHandler} > 
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
            
                <Button btnType= 'Success' disableBtn= {!this.state.formIsValid} > {this.state.isSignUp ? 'SIGNUP' : 'LOGIN'} </Button>
            </form>
                <Button btnType= 'Danger' clicked= {this.switchAuthModeHandler} > SWITCH TO {this.state.isSignUp ? 'LOGIN' : 'SIGNUP' } </Button>
            </div>     
        );

        if(this.props.loading){
           form = <Spinner /> 
        }
           
        let errorMessage = null;
        if(this.props.error){
            errorMessage = <p>{this.props.error} </p>;
        }    
            
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to= {this.props.authRedirectPath} />
        }    
        
        return(
            <div className= {classes.Auth} >
                {authRedirect}
                {errorMessage}
                <h2 style= {{color : 'orange'}} > WELCOME </h2>
                {form}
            </div>
        )
    }    
}

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !==null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);