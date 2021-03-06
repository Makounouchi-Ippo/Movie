import React, { Component } from 'react'
import { connect } from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {Alert} from 'react-bootstrap'
import '../Register/Register.css'
import * as regex from "../../../component/Utility/Regex"
import * as actions from '../../../store/actions/index'
import AOS from 'aos'

class Login extends Component {
    state = {
        mail: '',
        password: '',
        error: {},
        formvalid: false,
        disable: true
    }

    componentDidMount () {
        AOS.init()
    }

    handleFormValid = () => {
        let store = ''; 
        const error = {...this.state.error};
        const values = Object.values(error)
        for (const key of values)
            store += key;
        Object.keys(error).length===2 && store.length===0? this.setState({disable:false}):this.setState({disable:true});
    }

    handleInputValid = (name_input,value_input) => {
        let error = {...this.state.error};
        switch(name_input){
            case 'mail': value_input.match(regex.mail)  || value_input === '' ? error[name_input]='' : error[name_input] = "*votre mail nest pas valid";
                break;
            case 'password': value_input.match(regex.password) || value_input === '' ? error[name_input]='' : error[name_input] = "Mot-de-passe ne correspond pas";
                break;
            default:
                //console.log("Unknow value input");
        }
        this.setState({error:error}, () => {this.handleFormValid()});
    }

    handleInput = (event) => {
        const nameInput = event.target.name;
        const valueInput = event.target.value;
        this.setState({[event.target.name]:event.target.value},
            () => {this.handleInputValid(nameInput,valueInput)    
        });
    }

    handleSubmit =(event) => {
        event.preventDefault();
        this.props.authLog(this.state.mail, this.state.password,this.props.history) 
    }

     render() {
        let error;
        if (this.props.error!=null)
        {
            error = ( 
            <Alert  style={{zIndex:'500'}} variant="danger">
                <Alert.Heading>Team Netflix</Alert.Heading>
                <p>
                    Identifiant incorrect, veuillez le modifier !
                </p>
            </Alert>)
        }

        let form = (
            <form onSubmit={this.handleSubmit}>
                <p className='titleForm'>Se connecter</p>
                            <label className='FormR'>                         
                                <input className='input' type="text" name="mail" 
                                minLength="7" maxLength="30"
                                placeholder="mail" 
                                onChange={(e)=>this.handleInput(e)} 
                                required/>
                                <p className='error'> {this.state.error.mail}</p>
                            </label>
                            <label className='FormR'>
                                <input className='input' type="password" name="password" 
                                minLength="6" maxLength="20"
                                placeholder="Password" 
                                onChange={(e)=>this.handleInput(e)}
                                required/>
                                <p className='error'> {this.state.error.password}</p>
                            </label >
                            <div className='mdp'>
                                <a href='/forget-password'>Mot de passe oubliee ?</a>
                            </div>     
                            <input type="submit" value="Se connecter" className='buttonForm' disabled={this.state.disable}/>                           
                            <div className='inscrire'>
                                <p style={{textAlign:'center'}}> Pas encore inscrit</p> <Link to="/register">S'inscrire</Link>
                            </div>        
            </form>
        )
        return (
            <div className='page'>
                {/* {authRedirect} */}
                <div data-aos="zoom-in" data-aos-duration='2000'  className='gauche'>
                    {error} 
                    <h1 className='titre_login'> Que le spectacle commence !</h1>
                    <div className='Login'>                  
                        {form}  
                    </div>
                </div>   
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      loading: state.auth.loading,
      error: state.auth.error,
    };
};
  
  const mapDispatchToProps = dispatch => {
    return {
      authLog: (email, password, router) => dispatch(actions.authLog(email, password,router))
    };
  };
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Login)); 