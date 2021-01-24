import React, { Component, Suspense } from 'react';
import {connect} from 'react-redux';
import {Route, withRouter, Switch, Redirect} from 'react-router-dom';

import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';


const asyncCheckout = React.lazy(() => import('./containers/Checkout/Checkout'));
const asyncOrders = React.lazy(() => import('./containers/Orders/Orders'));
const asyncAuth = React.lazy(() => import('./containers/Auth/Auth'));

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }
    
  render() {
      let routes= (
            <Switch>
                <Route path= '/' exact component= {BurgerBuilder} /> 
        <Suspense fallback={<div>Loading...</div>} >  
                <Route path= '/auth' component= {asyncAuth} /> 
        </Suspense>  
                <Redirect to= '/' />
            </Switch>
      );
      if(this.props.isAuthenticated){
          routes = (
                <Switch>
                    <Route path= '/' exact component= {BurgerBuilder} /> 
                    <Route path= '/logout' component= {Logout} />
                <Suspense fallback={<div>Loading...</div>} >  
                    <Route path= '/order' component= {asyncOrders} /> 
                    <Route path= '/checkout' component= {asyncCheckout} />
                    <Route path= '/auth' component= {asyncAuth} /> 
                </Suspense>  
                    <Redirect to= '/' />
                </Switch>
          );
      }
      
      
    return (
      <div>
        <Layout>
            {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
