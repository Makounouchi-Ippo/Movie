import React from 'react'
import { useEffect,useState} from 'react';
import axios from 'axios'
import './FormUser.css'
// import {toast} from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
//import {Alert} from 'react-bootstrap';
import Button from 'muicss/lib/react/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FormUser = () => {
    const [id, setId] = useState('');
    const [idToken, setIdToken] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [login, setLogin] = useState('');
    const [address, setAddress] = useState('');
    const [mail, setMail] = useState('');
      //const [error, setError] = useState(null);


    const fetchMail= ()=>{
        if (mail.length === 0){
            setMail(localStorage.getItem('email'))
        }
    }

    useEffect (fetchMail
    ,[])

    useEffect(() => {    
    setIdToken(localStorage.getItem('token'))
    setId(localStorage.getItem('id'))
    let idLocal = localStorage.getItem('id')
    axios.get(`https://movies-27cd5.firebaseio.com/${idLocal}/user.json/`)
    .then(response => {
        //console.log('userrr//////',response.data)
        setAddress(response.data.address) 
        setName(response.data.name)   
        setLastname(response.data.lastname)  
        setLogin(response.data.login)  
        localStorage.setItem('form',true)
    })
    .catch(err => {
         //console.log('DIDMOUNT',err)
    })
    axios.get(`https://movies-27cd5.firebaseio.com/${idLocal}/mail.json/`)
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
            toast.success('Votre profil a ete mis a jour                     😀', {
            autoClose: 3000,
            closeButton:false,
            className:'toast1'
        })
        const mail = { mail:response.data.email };
        axios.put(`https://movies-27cd5.firebaseio.com/${id}/mail.json/`,mail)
         .then(response =>{ 
            //console.log('MailResponse',response)
        })
        .catch(error => { 
            //console.log('MailResponse',error) 
        })
        })
        .catch(err => {
            //console.log('maillllll',err.response.data.error.message)
           // setError('Mail deja utilisé veuilleur le modifier')
        toast.error('Erreur, Veuillez vous reconnectez                     😮', {
        autoClose: 3000,
        closeButton:false,
        className:'toast1'
        })
        })      
    }

    const handleSubmit =(event) => {
        event.preventDefault(); 
        localStorage.setItem('name',name)
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
            //console.log('data',response);  
            toast.success('Votre profil a ete mis a jour                     😀', {
            autoClose: 3000,
            closeButton:false,
            className:'toast1'
            })   
        })
        .catch(err => {
            //console.log('data',err.response)
            toast.error('Erreur, Veuillez vous reconnectez                        😮', {
            autoClose: 3000,
            closeButton:false,
            className:'toast1'
            })
        })    
    }

   let inputMail = null;
  
   localStorage.getItem('social') ? inputMail = (
            <div className='blockImage3'>
                <div className='TitreContainer'>
                    <h2 className='titreInContainer'>Mail </h2>
                    <div className='Form'>
                        <Form onSubmit={handleSubmitMail}>
                            <Input label="E-mail" minLength="6" type="email" floatingLabel={true} value={mail} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required title="email incorrect ex: netflix@gmail.com"  onChange={(e)=> setMail(e.target.value)}  />
                            <div className='buttonUser'>
                            <Button variant="raised" style={{textAlign:'center'}}>Submit</Button>
                            </div> 
                        </Form>
                    </div>     
                </div>
            </div>) : inputMail = null;

    return (
        <div> 
             <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
            <div className='blockImage1User'>
                    <div className='TitreContainer'>
                        <h2 className='titreInContainer'>Infos Utilisateurs </h2>
                        <div className='Form'>
                            <Form onSubmit={handleSubmit}>
                                <Input label="Nom" type="name" floatingLabel={true} minLength="3" maxLength="30" pattern="[A-Za-z]{1,32}" value={name} required title="Nom incorrect" onChange={(e)=> setName(e.target.value)} />
                                <Input label="Prenom" type="lastName"  floatingLabel={true} minLength="3" maxLength="30" pattern="[A-Za-z]{1,32}" value={lastname} required title="Prenom incorrect" onChange={(e)=> setLastname(e.target.value)} />
                                <Input label="Login" type="login"  floatingLabel={true} required  pattern="[A-Za-z0-9]+" value={login} title= "lettres et chiffre seulement, pas de ponctuation et caracteres speciaux" onChange={(e)=> setLogin(e.target.value)}/>
                                <Input label="Address" type="address"  floatingLabel={true}  required pattern="([a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ_-]| |/|\\|@|#|\$|%|&)+" value={address} title= "pas de caracteres speciaux"  onChange={(e)=> setAddress(e.target.value)}/>
                                <div className='buttonUser'>
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