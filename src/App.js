import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './container/layout/Layout'
import Register from './container/UsersAuth/Register/Register'
import Login from './container/UsersAuth/Login/Login'
import Logout from './container/Logout/Logout'
import ForgetPwd from './container/UsersAuth/ForgetPwd/ForgetPwd'
import Home from './container/Home/Home'
import MonCompte from './container/MonCompte/MonCompte'
import MovieDetail from './container/MovieDetail/MovieDetail'
//import NotFound from './component/Errror/Error'
import * as actions from './store/actions/index'
import Achat from './container/MonCompte/Achat/Achat'
import InfoPerso from './container/MonCompte/InfoPerso/InfoPerso'
import ConfirmOrder from './container/ConfirmOrder/ConfirmOrder'
import Social from './container/MonCompte/Social/Social'
import Panier from './container/ShoppingCart/ShoppingCart';

class App extends Component {
  
  componentDidMount () { 
    this.props.onTryAutoSignup();
  } 
  
  render() {
    let routeWithoutToken;
    let routesWithToken;
    if (!localStorage.getItem('token')) {
      routeWithoutToken = (
        <Switch>
          <Route  path="/register" exact component={Register} /> 
          <Route  path="/login" exact component={Login} /> 
          <Route path="/forget-password" exact component={ForgetPwd} />   
          <Redirect to="/login"/>
        </Switch>
      )
    }
    else if (localStorage.getItem('token')) {
      routesWithToken = (
        <Switch>
          <Route path="/home" exact component={Home}/>
          <Route path="/logout" exact component={Logout}/>
          <Route  path="/movie/:id"  exact component={MovieDetail}/>
          <Route path="/home" exact component={Home}/>
          <Route path="/panier" exact component={Panier}/>
          {localStorage.getItem('commandeSuccess') && <Route path="/confirmorder" component={ConfirmOrder}/> }
          <Route
            path="/compte/"
            render={({ match: {url} }) => (
              <div>
                <Route path={`${url}/`} component={MonCompte} exact />
                <Route path={`${url}/InfoPerso`} render={()=> <MonCompte child={<InfoPerso/>}/>}  />
                <Route path={`${url}/achats`} render={()=> <MonCompte child={<Achat/>}/>}  />
                <Route path={`${url}/social`} render={()=> <MonCompte child={<Social/>}/>} />

              </div>
            )}
          />
          <Redirect to="/home"/>
        </Switch>
      ) 
    }
    return (
      <div>
        <Layout>
          {routeWithoutToken}  
          {routesWithToken}
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));