import React, { Component } from 'react';
import classes from './App.module.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route,Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders'; 
import Auth from './containers/Auth/Auth';


class App extends Component {
  render(){
    return (
      <div classes={classes.App}>
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout}/>
            <Route path='/orders' component={Orders}/>
            <Route path='/' exact component={BurgerBuilder}/>
            <Route path='/auth' component={Auth}/>
                                  
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
