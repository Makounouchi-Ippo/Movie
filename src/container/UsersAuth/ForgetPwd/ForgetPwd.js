import React, { Component } from 'react'
import '../Register/Register.css'
import * as regex from "../../../component/Utility/Regex"
import firebase from '../../../fire.js';
import {Alert} from 'react-bootstrap'
import AOS from 'aos'

class ForgetPwd extends Component {
    state = {
        mail: '',
        error: {},
        catch:'',
        response:'',
        formvalid: false,
        disable: true,
        show: true,
    }

    componentDidMount ()  {
        AOS.init()
    }

    handleFormValid = () => {
        let store = ''; 
        const error = {...this.state.error};
        const values = Object.values(error)
        for (const key of values)
            store += key;
        Object.keys(error).length===1 && store.length===0? this.setState({disable:false}):this.setState({disable:true});
    }
    handleInputValid = (name_input,value_input) => {
        let error = {...this.state.error};
        switch(name_input){
            case 'mail': value_input.match(regex.mail)  || value_input === '' ? error[name_input]='' : error[name_input] = "*votre mail nest pas valid";
                break;
            default:
                //console.log("NUMBER NOT FOUND");
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

    handleSubmit = (event) => {
        event.preventDefault();
        //console.log('FORgotPassword',this.state.mail)
        firebase.auth().sendPasswordResetEmail(this.state.mail).then(e =>{
            this.setState({response:"vous recevrez dans quelques instants un mail avec les instructons pour rétablir le mot de passe"})
        })
        .catch(response => {
            this.setState({response:"Votre email ne correspond pas avec celui fournit a l'inscription"})
        })
    }

     render() {
        let form = null;
        let msg;

        if (this.state.response === 'vous recevrez dans quelques instants un mail avec les instructons pour rétablir le mot de passe')
        {
            msg = (
                <Alert variant="success" style={{zIndex:'500'}}>
                    <Alert.Heading>Team Netflix</Alert.Heading>
                    <p>
                    vous recevrez dans quelques instants un mail avec les instructons pour rétablir le mot de passe
                    </p>
                 </Alert>
            ) 
        }
        
        if (this.state.response === "Votre email ne correspond pas avec celui fournit a l'inscription")
        {
           msg=(
            <Alert variant="danger" style={{zIndex:'500'}}>
                <Alert.Heading>Team Netflix</Alert.Heading>
                <p>
                    Votre email ne correspond pas avec celui fournit a l'inscription, veuillez le modifier !
                </p>
            </Alert>
           ) 
        }  

        form = ( 
            <form className='pwd' onSubmit={this.handleSubmit}>
                <p className='titleForm'>Saisissez votre e-mail</p>
                    <label className='FormR'>                         
                        <input className='input' type="text" name="mail" 
                            minLength="7" maxLength="30"
                            placeholder="mail" 
                            onChange={(e)=>this.handleInput(e)} 
                            required/>
                        <p className='error'> {this.state.error.mail}</p>
                    </label>
                    <input type="submit" value="Envoyer mail" className='buttonForm' disabled={this.state.disable} onClick={this.Notify}/>
            </form>
  
            )
    

        return (
            <div className='page'>
                <div data-aos="zoom-in" data-aos-duration='2000' className='gauche'>
                     {msg}
                <h1 className='titre_login'> Mot de passe oubliée</h1>
                        {form}
                   
                </div>

            </div>
        )
    }
}




export default ForgetPwd;
