import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { providerG, providerF,providerT } from '../../../fire.js';
import {Alert} from "react-bootstrap";
import Authphone from './authPhone';
import * as actions from '../../../store/actions/index';
import * as regex from "../../../component/Utility/Regex";
import Spinner from '../../../component/UI/Spinner/Spinner';
import { SocialIcon } from 'react-social-icons';
import "./Register.css";
import AOS from 'aos'

class UsersAuth extends Component {
    state = {
        mail: '',
        password: '',
        error: {},
        modal: false,
        formvalid: false,
        disable: true,
        loading: false,
        reponseServeur:null,
        redirect: false,
        show: false
    }

    componentDidMount  ()  {
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

    displayInput = () => (
        this.setState((prevstate) => {
          return {show: !prevstate.show}
        })
    )

    handleInputValid = (name_input,value_input) => {
        let error = {...this.state.error};
        switch(name_input){
            case 'mail': value_input.match(regex.mail)   ? error[name_input]='' : error[name_input] = "*votre mail nest pas valid";
                break;
           
            case 'password': value_input.match(regex.password)  ? error[name_input]='' : error[name_input] = "*Au moins: 1Min, 1Maj et 1chiffre ";
                break;
            default:
                console.log("NUMBER NOT FOUND");
        }
        this.setState({error:error}, () => {this.handleFormValid()});
    }

    authsocial= (provider) => {
        if (provider === providerT)
            this.props.socialAuthTwitter(provider,this.props.history);
        else if (provider === providerF)
            this.props.socialAuthFacebook(provider,this.props.history);
        else
            this.props.socialAuth(provider,this.props.history);
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
        this.props.onAuth(this.state.mail, this.state.password);
    }
    
    render() {
        let form;
        let modal;

        let errorMail;
        if (this.props.error!=null) {  
            errorMail = (
            <Alert  variant="danger" style={{marginTop:'60px',zIndex:'500'}}>
                <Alert.Heading>Team Netflix</Alert.Heading>
                <p>
                    Cette email existe, veuillez le modifier !
                </p>
            </Alert>)
        }
        
        if (this.props.modal === true) {
            modal = (
            <div data-aos="zoom-in" data-aos-duration='2000' className='modal2'>
                <Modal.Dialog style={{backgroundColor:'black',color:'white'}}>
                    <Modal.Header style={{backgroundColor:'black',color:'white'}}>
                        <Modal.Title > Bienvenue Jeune Netflixeur </Modal.Title>
                    </Modal.Header>    
                    <Modal.Body style={{backgroundColor:'black',color:'white'}}>
                        <p>Dorenavent vous faites parties de la communauté Netflix :)</p>
                        <p>Cliquez sur le lien ci-dessous vous serez dirigez vers la page de connexion </p>
                        <a href="http://localhost:3000/login" style={{margin:'auto'}}> CONNEXION</a> 
                    </Modal.Body>  
                </Modal.Dialog>
            </div>
            )
        }
       
        if (this.props.loading)
            form = <Spinner/>

        else if (this.props.modal === false) {
            form = (
            <div data-aos="zoom-in" data-aos-duration='2000'  className='gauche'>
                {errorMail}
                <h1 className='gauche_h1'>NETFLIX </h1>
                <h2 className='h2'>Films, séries TV et bien plus en illimité!</h2>
                <div className='UsersAuth'>   
                    <form  onSubmit={this.handleSubmit}>
                        <p className='titleForm'>S'inscrire</p>
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
                            
                                <input type="submit" value="S'inscrire" className='buttonForm' disabled={this.state.disable}/>
                        
                        
                    </form> 
                </div>
                <div className='social_button'>
                    <SocialIcon network="facebook" onClick={()=>this.authsocial(providerF)} />
                    <SocialIcon network="twitter" onClick={()=>this.authsocial(providerT)} />
                    <SocialIcon network="google" onClick={() =>this.authsocial(providerG)} />
                    <div style={{backgroundColor:'yellow', borderRadius:'50%', width:"50px", height:'50px', display:'flex', alignItems:'center', justifyContent:'center'}} onClick={this.displayInput}>
                        <i style={{fontSize:'40px', color:'black'}} className="fa fa-mobile-phone" ></i>
                    </div>
                </div>
                {this.state.show ? <Authphone/> : null}
            </div>
            )             
        }

        return (
            <div className='page'>
               {form}
               {modal} 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        modal: state.auth.modal,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
        modalFalse : () => dispatch(actions.modalFalse()),
        socialAuth:(provider,history) => dispatch(actions.socialAuth(provider,history)),
        socialAuthTwitter:(provider,history) => dispatch(actions.socialTwitter(provider,history)),
        socialAuthFacebook:(provider,history) => dispatch(actions.socialFacebook(provider,history))
    };
};
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps) (UsersAuth));