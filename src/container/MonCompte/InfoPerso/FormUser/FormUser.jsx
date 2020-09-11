import React from 'react'
import { useEffect,useState} from 'react';
import axios from 'axios'
import classes from './FormUser.css'
// import {toast} from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import {Alert} from 'react-bootstrap';
import Button from 'muicss/lib/react/button';

const FormUser = () => {

    const [id, setId] = useState('');
    const [idToken, setIdToken] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [login, setLogin] = useState('');
    const [address, setAddress] = useState('');
    const [mail, setMail] = useState('');
    const [alert, setAlert] = useState(false);
    const [alert1, setAlert1] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
       setIdToken(localStorage.getItem('token'))
       setId(localStorage.getItem('id'))
       let idLocal = localStorage.getItem('id')
       const mail ={
           mail:localStorage.getItem('mail')
       }
       axios.get(`https://movies-27cd5.firebaseio.com/${idLocal}/user.json/`)
       .then(response => {
            //console.log('userrr//////',response.data)
            setAddress(response.data.address) 
            setName(response.data.name)   
            setLastname(response.data.lastname)  
            setLogin(response.data.login)  
       })
       .catch(err => {
            //console.log('DIDMOUNT',err)
       })
     axios.put(`https://movies-27cd5.firebaseio.com/${idLocal}/mail.json/`,mail)
        .then(response => {
         //console.log('MAIL//////',response.data)
         setMail(response.data.mail);
        }).catch(error => {
            //console.log('MAILL//',error)
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
            setAlert1(false)
            setAlert(true)   
            const mail = { mail:response.data.email };
            axios.put(`https://movies-27cd5.firebaseio.com/${id}/mail.json/`,mail)
            .then(response =>{ console.log('MailResponse',response) })
            .catch(error => { console.log('MailResponse',error) })
        })
        .catch(err => {
            console.log('maillllll',err.response.data.error.message)
            setError('Mail deja utilisé veuilleur le modifier')
            setAlert1(true)
            setAlert(false)   
        })      
    }

    const handleSubmit =(event) => {
        event.preventDefault(); 
        console.log('STATE===',name,lastname,login,address)
        const data = {
            name:name,
            lastname: lastname,
            login: login,
            address: address,
            //mail: mail
        };
        //setAlert(false)
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
   let msgError= null;
   let msgSuccess = null;

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

  msgSuccess = alert ?  <Alert variant="success"  style={{width:'auto',height:'auto',textAlign:'center',top:'-450px'}} onClose={() => setAlert(false)} dismissible>
                      <Alert.Heading style={{width:'auto'}}>Votre profil a bien été mis a jour</Alert.Heading>
                </Alert>:null
  msgError = alert1 ?  <Alert variant="danger"  style={{width:'auto',height:'auto',textAlign:'center',top:'-450px'}} onClose={() => setAlert1(false)} dismissible>
  <Alert.Heading style={{width:'auto'}}>Trop d'essaie , veuillez essayer ulterieurement</Alert.Heading>
</Alert>:null

    return (
        <div> 
            {msgSuccess}
            {msgError}
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
             <div>
                   {inputMail}
                   
             </div>
        </div>
    )
}

export default FormUser;