import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import './CarteBleu.css'
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Modal} from 'react-bootstrap'
import AOS from 'aos'

const CarteBleu = () => {
    const [cvc, setCvc] = useState('')
    const [focus, setFocus] = useState('')
    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [number, setNumber] = useState('')
    const [modal, setModal] = useState(false);
  
   
    useEffect(() => {
      AOS.init()
       let idLocal = localStorage.getItem('id')
       axios.get(`https://movies-27cd5.firebaseio.com/${idLocal}/CarteBleu.json/`)
       .then(response => {
            //console.log('userrr//////',response.data)
            setCvc(response.data.cvc) 
            setName(response.data.name)   
            setExpiry(response.data.expiry)  
            setNumber(response.data.number)
       })
       .catch(err => {
            //console.log('DIDMOUNT',err)
       })      
      },[]) 


    const handleSubmit =(event) => {
        event.preventDefault(); 
        console.log('STATE===',cvc,name,expiry,number)
        const data = {
            name:name,
            number: number,
            cvc: cvc,
            expiry: expiry,
        };
        //setAlert(false)
        axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/CarteBleu.json/`,data)
        .then(response => {
            console.log('data',response);  
            toast.success('Votre profil a ete mis a jour', {
              autoClose: 3000,
              closeButton:false,
              className:'toast1'
          })
          
        })
        .catch(err => {
            console.log('data',err.response)
            toast.error('Erreur, veuillez ressayer plus tard', {
              autoClose: 3000,
              closeButton:false,
              className:'toast1'
          })
     
        })    
    }

    const deleteAccount = () => {
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDJQ2C-WHsJXu5xVCG5Z98XQ31gRJrSV_E',{
        "idToken": localStorage.getItem('token')
      }) 
      .then(res =>{
        toast.info('Votre compte a bien ete supprimer a bientot .', {
          autoClose: 3000,
          closeButton:false,
          className:'toast1'
          
      })
          localStorage.clear();
          setModal(false);
          })
      .catch(err => {
                console.log('REPONSE DELETE ACCOUNT ===== ',err)
                toast.error('Erreur, veuillez vous reconnectez .',  {
                  autoClose: 3000,
                  closeButton:false,
                  className:'toast1'
              })

        })
    }

    
    function MyVerticallyCenteredModal(props) {
        return (
          <Modal 
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >  <Modal.Header  style={{backgroundColor:'black',color:'white'}}>
               <Modal.Title>Team Netflix</Modal.Title>
            </Modal.Header>
             <Modal.Body  style={{backgroundColor:'black',color:'white'}}>
            <p>
              Nous sommes triste de vous voir partir  <br/>
              Etes vous sur de vouloir supprimer votre compte ?<br/>
              Cette action entrainera une supression definitive de vos données
            </p>

            </Modal.Body>
            <Modal.Footer style={{backgroundColor:'black',color:'white',display:'flex',justifyContent:'space-around'}}>
            <Button style={{backgroundColor:'grey',color:'white'}} onClick={ () => setModal(false)} >Annuler</Button>
              <Button style={{backgroundColor:'red',color:'white'}} onClick={deleteAccount}>Confirmer</Button>
            </Modal.Footer>
          </Modal>
        );
      }

      if (localStorage.getItem('token')=== null){
        setTimeout(() => {
          return(window.location.reload(false))
        },3000);
        
      }
    return (
    <>
        <div className='blockImage100'>
        <ToastContainer position='top-center'/>
            <div id="PaymentForm" className='TitreContainerCarte'>
                <h2 className='titreInContainerCarte'> Carte Bleue </h2>   
                    <div className='blockCartebleu'>
                        <div className='Cartebleu'>
                        <Cards 
                            cvc={cvc}
                            expiry={expiry}
                            focused={focus}
                            name={name}
                            number={number}
                            />
                        </div>
                        <form className='InputCartebleu' onSubmit={handleSubmit}>
                                <Input  label="Card Number" minLength="16" maxLength="16"  value={number} onChange={(e) => setNumber(e.target.value)} onFocus={e => setFocus(e.target.name)} pattern ="[0-9]+" title="please enter number only" required type='tel'  name='number' floatingLabel={true} />
                                <Input  label="Name" minLength="2" maxLength="25"  value={name} onChange={(e) => setName(e.target.value)} onFocus={e => setFocus(e.target.name)}  pattern="^[A-Za-z -]+$" title="please enter letters only" type="text" required  floatingLabel={true} />
                                <div className='cvcDateCartebleu'>
                                    <Input  label="Date expiry" minLength="4" maxLength="4"  value={expiry} onChange={(e) => setExpiry(e.target.value)} onFocus={e => setFocus(e.target.name)} pattern ="[0-9]+" title="please enter number only"  required  type="text" name ='expiry' floatingLabel={true} />
                                    <Input  label="CVC" minLength="3" maxLength="3"  value={cvc} onChange={(e) => setCvc(e.target.value)} onFocus={e => setFocus(e.target.name)} pattern ="[0-9]+" title="please enter number only"  type="tel" name='cvc' required  floatingLabel={true} />
                                </div>
                                <div className='buttonUserCarteBleu'>
                                    <Button  className='buttonCarteBleu' variant="raised" style={{textAlign:'center'}}>Submit</Button>
                                </div>
                       </form>
                    </div>
            </div>
        </div>
      {localStorage.getItem('social') && <p className='deleteCompte'  onClick={()=>setModal(true)}>Supprimer mon compte</p>}  
        <MyVerticallyCenteredModal data-aos="zoom-in" data-aos-duration='2000' 
        show={modal}
        onHide={() => setModal(false)}
      />
      </>
    )
}

export default CarteBleu;