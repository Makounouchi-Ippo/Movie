import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import fire from './fire' 

import Layout from './container/layout/Layout'
import Register from './container/UsersAuth/Register/Register'

import Login from './container/UsersAuth/Login/Login'
import Logout from './container/Logout/Logout'
import ForgetPwd from './container/UsersAuth/ForgetPwd/ForgetPwd'
import Home from './container/Home/Home'
import Profil from './container/Profil/EditProfil'
import MovieDetail from './container/MovieDetail/MovieDetail'
//import NotFound from './component/Errror/Error'
import * as actions from './store/actions/index'





class App extends Component {

  state = {
    user: null
  }

  componentDidMount () { 
    this.props.onTryAutoSignup();
    this.authListener (); 
   
  } 
  
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      //console.log('user=',user);
      if (user) {
        this.setState({ user });
       
      } else {
        this.setState({ user: null })
      }
    });
  }

  render() {

    let routes = (
      <Switch>
      <Route  path="/register"  component={Register} /> 
      <Route  path="/login" component={Login} /> 
       <Route path="/forget-password"  component={ForgetPwd} />   
       <Redirect to="/register"/>
      </Switch>
    )

    if (localStorage.getItem('token'))
    {
      routes= (
      <Switch>
        <Route path="/home" component={Home}/>
        <Route path="/profil" component={Profil}/>
        <Route path="/logout" component={Logout}/>
        <Route  path="/movie/:id"  component={MovieDetail}/>
        <Redirect to="/home"/>
      
     </Switch>
       ) 
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
  return{
    token: state.auth.token !== null
  }
 
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));