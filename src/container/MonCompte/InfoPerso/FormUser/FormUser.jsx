import React from 'react'
import { useEffect,useState} from 'react';
import axios from 'axios'
import classes from './FormUser.css'
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';

const FormUser = () => {

    const [id, setId] = useState('');

    useEffect(() => {
       setId(localStorage.getItem('token'))
      },[])
      console.log('fffff',id)

     const handleInput = () => {

     }

    const handleSubmit =(event) => {
        event.preventDefault(); 
        const authData = {
            idToken:id,
            email: 'mehdi_934000@hotmail.fr',
            returnSecureToken: true
        };
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDJQ2C-WHsJXu5xVCG5Z98XQ31gRJrSV_E',authData)
        .then(response => {
            console.log('maillllllllll',response);           
        })
        .catch(err => {
            console.log('maillllll',err.response)
        })      
    }

    return (
        <div>
            <div className={classes.blockImage1}>
                    <div className={classes.TitreContainer}>
                        <h2 className={classes.titreInContainer}>Infos Utilisateurs </h2>
                        <div className={classes.Form}>
                            <Form onSubmit={handleSubmit}>
                                <Input label="Nom" type="name" floatingLabel={true} minLength="7" maxLength="30" onChange={handleInput} required />
                                <Input label="Prenom" type="lastName"  floatingLabel={true}  />
                                <Input label="Login" type="login"  floatingLabel={true}  />
                                <Input label="Address" type="address"  floatingLabel={true}  />
                                <div className={classes.button}>
                                  <Button variant="raised" style={{textAlign:'center'}}>Submit</Button>
                                </div> 
                            </Form>
                        </div>     
                    </div>
             </div>

             <div className={classes.blockImage3}>
                    <div className={classes.TitreContainer}>
                        <h2 className={classes.titreInContainer}>Mail </h2>
                        <div className={classes.Form}>
                            <Form onSubmit={handleSubmit}>
                                <Input label="E-mail" minLength="12" type="email" floatingLabel={true}  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required  />
                                <div className={classes.button}>
                                  <Button variant="raised" style={{textAlign:'center'}}>Submit</Button>
                                </div> 
                            </Form>
                        </div>     
                    </div>
             </div>
        </div>
    )
}

export default FormUser;