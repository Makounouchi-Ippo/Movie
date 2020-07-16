import React, { Component } from 'react'
import classes from '../Register/Register.css'
import * as regex from "../../../component/Utility/Regex"
import firebase from '../../../fire.js';
import {Alert} from 'react-bootstrap'



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
                console.log("NUMBER NOT FOUND");
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

  


    handleSubmit =  (event) => {
        event.preventDefault();
        console.log('FORgotPassword',this.state.mail)
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
                <Alert variant="success">
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
            <Alert variant="danger">
            <Alert.Heading>Team Netflix</Alert.Heading>
            <p>
                 Votre email ne correspond pas avec celui fournit a l'inscription, veuillez le modifier !
            </p>
          </Alert>

           ) 

           }  
        
        form = (
                <div className={classes.fpwd}> 
                <form className={classes.Form} onSubmit={this.handleSubmit}>
                <div className={classes.title}>
                    <p>veuillez saisir votre adresse e-mail </p>
                </div>
                <div>
                    <label className={classes.input}>                         
                        <input type="text" name="mail" 
                        minLength="7" maxLength="30"
                        placeholder="mail" 
                        onChange={(e)=>this.handleInput(e)} 
                        required/>
                        <p className={classes.error}> {this.state.error.mail}</p>
                    </label>
                    <label>
                    <input type="submit" value="Envoyer mail" className={classes.button} disabled={this.state.disable} onClick={this.Notify}/>
                    </label>
                </div>
                
        
               </form>
               </div>
            )
    

        return (
            <div className={classes.page}>
                <div className={classes.gauche}>
                     {msg}
                <h1 className={classes.titre_login}> Mot de passe oubliée</h1>
                        {form}
                   
                </div>

            </div>
        )
    }
}




export default ForgetPwd;
