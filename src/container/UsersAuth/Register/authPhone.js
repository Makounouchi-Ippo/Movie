import React, {Component} from 'react'
import {Button, Form} from 'react-bootstrap'
import firebase from '../../../fire'
import * as regex from '../../../component/Utility/Regex'
import classes from './Register.css'
import {Alert} from 'react-bootstrap'


import { withRouter } from 'react-router-dom';
import * as actions from '../../../store/actions/index'

import { connect } from 'react-redux';


class Phone extends Component {
    state = {
        phone:null,
        codeVerification:null,
        error:{},
        error1:{},
        errorCatch:'',
        disable:true,
        disable1:true,
        confirmResult: null,
        userId: null,
        value:null,
        show: false,
        codeError:null
    }

    handleFormValidcode = () => { 
        let store = ''; 
        const error = {...this.state.error1};
        const values = Object.values(error)
        for (const key of values)
            store += key;
        Object.keys(error).length===1 && store.length===0? this.setState({disable1:false}):this.setState({disable1:true},()=>{console.log(this.state.disable1)});
}

    handleFormValidphone = () => { 
            let store = ''; 
            const error = {...this.state.error};
            const values = Object.values(error)
            for (const key of values)
                store += key;
            Object.keys(error).length===1 && store.length===0? this.setState({disable:false}):this.setState({disable:true},()=>{console.log(this.state.disable)});
    }

    handleInputValid = (name_input,value_input) => {
        let error = {...this.state.error};
        let error1 ={...this.state.error1}
        switch(name_input){
            case 'phone': value_input.match(regex.phoneNumber)  ? error[name_input]='' : error[name_input] = "*votre numero nest pas valid";
                break;
            case 'codeVerification':value_input.match(regex.codeVerification) && value_input.length==6 ? error1[name_input]='' : error1[name_input] = "*mauvais format 5chiffre sont attendues";
                 break;
            default:
                console.log("NUMBER NOT FOUND");
        }
      
        this.setState({error:error}, () => {this.handleFormValidphone()});
    
        this.setState({error1:error1}, () => {this.handleFormValidcode()});
        
       
    }
    

    handleInput = (event) => {
        const nameInput = event.target.id;
        const valueInput = event.target.value;
        console.log(nameInput,valueInput)

        this.setState({[event.target.id]:event.target.value},
            () => {this.handleInputValid(nameInput,valueInput)    
        });
    }



    sendCode = (e) => {  
        e.preventDefault();
        firebase.auth().languageCode = 'fr';
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container",
        {
           size:"invisible"
        });
        let phoneNumber = this.state.phone;
        console.log('phone====',phoneNumber);
        let appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(confirmationResult => { 
            this.setState({show:true})
            window.confirmationResult = confirmationResult;
         }).catch(error => {
            console.log('error===',error)
            this.setState({errorCatch:error.message})
    });
    }
        
   
    receiveCode= (e) => {
        e.preventDefault();
        const verificationId = this.state.codeVerification;
        window.confirmationResult
          .confirm(verificationId)
          .then(result => {
            // User signed in successfully.
            localStorage.setItem('id',result.user.uid)
            localStorage.setItem('token', result.user.ma)
            localStorage.setItem('show', true)
            this.props.onPhone(result.user.ma,result.user.uid);
            this.props.history.push('/home')
          })
          .catch(error => {
            // User couldn't sign in (bad verification code?)
            this.setState({codeError:'Error lors de la verification du code: code invalide'})
          });

    }
   

    render() {

        let msg;
        let formcode;
        let formphone;
        let msgCatch;
       
        msg=(
            <p className={classes.error}> {this.state.error.phone}</p>);


        if (this.state.errorCatch && this.state.codeError===null)
        {
            msgCatch = (
                <Alert variant="danger">
                <Alert.Heading>Team Netflix</Alert.Heading>
                <p>
                    Trop d'essai votre compte a été temporairement suspendu. Reesayer plus tard
                </p>
              </Alert>)
        }
        
        
        if (this.state.codeError)
        {
            msgCatch = (
                <Alert variant="danger">
                <Alert.Heading>Team Netflix</Alert.Heading>
                <p>
                    le code ne coresspond pas a celui qui vous a été envoyer veuillez ressayer
                </p>
              </Alert>)
        }

        if (this.state.show && this.state.codeError===null)
        {
            msgCatch = (
                <Alert variant="success">
                <Alert.Heading>Team Netflix</Alert.Heading>
                <p>
                vous recevrez dans quelques instants un code par SMS a taper sur le formulaire ci-dessous
                </p>
                 </Alert>)
        }
        


        if (this.state.show===false){
                formphone= (
                    
                    <Form.Group bg="light" variant="light" className=" d-flex flex-column ">
                       <h2> <Form.Label  className=' pt-3 pb-1' style={{fontFamily: 'Roboto',color:'#c71414',fontWeight: 'bold',fontSize:'25px',textShadow: '2px 4px 5px rgba(0,0,0,0.3)'}}>Connexion via Smarthpone</Form.Label>  </h2> 
                        <Form.Control  id="phone" style={{borderRadius: '3rem',fontFamily: 'Sulphur Point'}} className="w-90" type="tel" placeholder="Enter Phone-number ex :+33625145895"   onChange={(e)=>this.handleInput(e)}/>
                        <Form.Text className="text-muted"  style={{ marginTop: '4px',fontFamily: 'Roboto',marginBottom:'9px'}}>         
                         {this.state.error.phone ? msg : "Don't worry, votre numero sera bien gardé" }     
                        </Form.Text>
                        <Button  style={{borderRadius:'6rem',width:'140px', margin:'auto'}}  id="recaptcha-container"  variant="danger" type="danger" disabled={this.state.disable} onClick={(e)=>this.sendCode(e)}>
                        Envoyer code
                        </Button>
                    </Form.Group>
              
    
                )
    
            }
        

        if (this.state.show ){
          formcode= ( 
         
            <Form.Group bg="light" variant="light" className=" d-flex flex-column ">
            <h2> <Form.Label  className=' pt-3 pb-1' style={{fontFamily: 'Roboto',color:'#c71414',fontWeight: 'bold',fontSize:'25px',textShadow: '2px 4px 5px rgba(0,0,0,0.3)'}}>Connexion via Smarthpone</Form.Label>  </h2> 
               <Form.Control  id="codeVerification" style={{borderRadius: '3rem',fontFamily: 'Sulphur Point'}} className="w-90" type="tel" placeholder="Enter the code verification "    onChange={(e)=>this.handleInput(e)} />
                <Form.Text className="text-muted"  style={{ marginTop: '4px',fontFamily: 'Roboto'}}>         
                <p className={classes.error}> {this.state.error1.codeVerification}</p>   
                </Form.Text>
            <Button  style={{borderRadius:'6rem'}}  id="code" className='mt-2'  variant="danger" type="danger" disabled={this.state.disable1} onClick={(e)=>this.receiveCode(e)}>
                S'inscrire
            </Button> 
            </Form.Group>
            )
        }

   

        return (
            
            <Form style={{ width:'350px', opacity:'0.7',boxShadow:'5px 5px rgb(8, 7, 7)',borderRadius:'20px', display:'flex',flexDirection:'inherit',alignItems:'center'}} className=' bg-white mt-5' onSubmit={this.onSubmit}>
                 {msgCatch}
                 {formcode}
                 {formphone}

            </Form>
           
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
      onPhone: (token, userId) => dispatch(actions.authSuccess(token, userId))
    
    };
  };

  export default withRouter(connect(null, mapDispatchToProps) (Phone));


