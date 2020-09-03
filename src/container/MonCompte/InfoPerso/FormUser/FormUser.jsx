import React from 'react'
import { useEffect,useState} from 'react';
import axios from 'axios'
import classes from './FormUser.css'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';


toast.configure();

const FormUser = () => {

    const [id, setId] = useState('');
    const [idToken, setIdToken] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [login, setLogin] = useState('');
    const [address, setAddress] = useState('');
    const [mail, setMail] = useState('');
    const [alert, setAlert] = useState(false);

    useEffect(() => {
       setIdToken(localStorage.getItem('token'))
       setId(localStorage.getItem('id'))
       let idLocal = localStorage.getItem('id')
       axios.get(`https://movies-27cd5.firebaseio.com/${idLocal}/user.json/`)
       .then(response => {
            console.log('userrr//////',response.data)
            setAddress(response.data.address) 
            setName(response.data.name)   
            setLastname(response.data.lastname)  
            setLogin(response.data.login)  
       })
       .catch(err => {
            console.log('DIDMOUNT',err)
       })
      },[]) 

     
    const handleSubmitMail =(event) => {
        event.preventDefault(); 
        const authData = {
            idToken:idToken,
            email: mail,
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

    const handleSubmit =(event) => {
        event.preventDefault(); 
        console.log('STATE===',name,lastname,login,address)
        const data = {
            name:name,
            lastname: lastname,
            login: login,
            address: address
        };
        setAlert(false)
        axios.put(`https://movies-27cd5.firebaseio.com/${id}/user.json/`,data)
        .then(response => {
            console.log('data',response);  
            setAlert(true)         
        })
        .catch(err => {
            console.log('data',err.response)
            setAlert(false)
        })    
    }
    
   let inputMail = null;
   let msg= null;

   localStorage.getItem('social') ? inputMail = (
            <div className={classes.blockImage3}>
                <div className={classes.TitreContainer}>
                    <h2 className={classes.titreInContainer}>Mail </h2>
                    <div className={classes.Form}>
                        <Form onSubmit={handleSubmitMail}>
                            <Input label="E-mail" minLength="6" type="email" floatingLabel={true} value={mail} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required title="email incorrect ex: netflix@gmail.com"  onChange={(e)=> setMail(e.target.value)}  />
                            <div className={classes.button}>
                            <Button variant="raised" style={{textAlign:'center'}}>Submit</Button>
                            </div> 
                        </Form>
                    </div>     
                </div>
            </div>) : inputMail = null;

  msg = alert ? toast.success('dddddd',{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,}):null

    return (
        <div>
           
            <div className={classes.blockImage1}>
                    <div className={classes.TitreContainer}>
                        <h2 className={classes.titreInContainer}>Infos Utilisateurs </h2>
                        <div className={classes.Form}>
                            <Form onSubmit={handleSubmit}>
                                <Input label="Nom" type="name" floatingLabel={true} minLength="3" maxLength="30" pattern="[A-Za-z]{1,32}" value={name} required title="Nom incorrect" onChange={(e)=> setName(e.target.value)} />
                                <Input label="Prenom" type="lastName"  floatingLabel={true} minLength="3" maxLength="30" pattern="[A-Za-z]{1,32}" value={lastname} required title="Prenom incorrect" onChange={(e)=> setLastname(e.target.value)} />
                                <Input label="Login" type="login"  floatingLabel={true} required  pattern="[A-Za-z0-9]+" value={login} title= "lettres et chiffre seulement, pas de ponctuation et caracteres speciaux" onChange={(e)=> setLogin(e.target.value)}/>
                                <Input label="Address" type="address"  floatingLabel={true}  required pattern="([a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ_-]| |/|\\|@|#|\$|%|&)+" value={address} title= "pas de caracteres speciaux"  onChange={(e)=> setAddress(e.target.value)}/>
                                <div className={classes.button}>
                                  <Button variant="raised" style={{textAlign:'center'}}>Submit</Button>
                                </div> 
                            </Form>
                        </div>     
                    </div>
                    
             </div>
             {msg}
             <div>
                   {inputMail}
                   
             </div>
        </div>
    )
}

export default FormUser;