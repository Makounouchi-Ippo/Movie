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

class App extends Component {
  
  componentDidMount () { 
    this.props.onTryAutoSignup();
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

    if (localStorage.getItem('token')) {
      routes = (
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/logout" component={Logout}/>
          <Route  path="/movie/:id"  component={MovieDetail}/>
          <Route
            path="/compte/"
            render={({ match: {url} }) => (
              <div>
                <Route path={`${url}/`} component={MonCompte} exact />
                <Route path={`${url}/InfoPerso`} render={()=> <MonCompte child={<InfoPerso/>}/>}  />
                <Route path={`${url}/achats`} render={()=> <MonCompte child={<Achat/>}/>}  />
                <Route path={`${url}/social`} render={()=> <MonCompte child={<Achat/>}/>} />
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
          {routes}  
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