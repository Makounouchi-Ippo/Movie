import React, {Component} from 'react';
import * as actions from '../../store/actions/index'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux';

class Logout extends Component {

    componentDidMount() {
        this.props.reset();
        this.props.popular();
        this.props.initCart();
        this.props.onLogout();
         
    }
    
    render () {
        return(
            <Redirect to="/login"/>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.authLogout()),
        reset: () => dispatch(actions.reset()),
        initCart: () => dispatch(actions.initCart()),
        popular: () => dispatch(actions.movieSearch('fetchDataPopular'))
      };
    }

export default connect(null,mapDispatchToProps)(Logout);