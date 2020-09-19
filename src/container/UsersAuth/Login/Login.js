import React, { Component } from 'react'
import { connect } from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {Alert} from 'react-bootstrap'
import '../Register/Register.css'
import * as regex from "../../../component/Utility/Regex"
import * as actions from '../../../store/actions/index'
import Spinner from "../../../component/UI/Spinner/Spinner"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Login extends Component {
    state = {
        mail: '',
        password: '',
        error: {},
        formvalid: false,
        disable: true,
        aff:false
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
                console.log("Unknow value input");
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
        this.setState({aff:true})
        event.preventDefault();
        this.props.authLog(this.state.mail, this.state.password,this.props.history) 
    }
     render() {

        let error;
        if (this.props.error!=null)
        {
            if (this.state.aff === true ) {
                toast.error('Identifiants incorrect', {
                    autoClose: 3000,
                    closeButton:false,
                    className:'toast1' })
                    this.setState({aff:false})
            }
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
                                <Link to='/forget-password'>Mot de passe oubliee ?</Link>
                            </div>
                           
                            <input type="submit" value="Se connecter" className='buttonForm' disabled={this.state.disable}/>
                            
                            <div className='inscrire'>
                                <p style={{textAlign:'center'}}> Pas encore inscrit</p> <Link to="/register">S'inscrire</Link>
                            </div>
                           
                   

            </form>
        )

        if (this.props.loading){
            form = (
            <div>
                 <Spinner/>
                <p> Attend Mageul, fait pas le presser</p>
            </div>
            )   
        }

        return (
            <div className='page'>
                {/* {authRedirect} */}
                <div className='gauche'>
                <ToastContainer position="top-center" autoClose={5000}/>
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