import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import './Social.css'
import Switch from "react-switch";
import {Modal} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios'
import  * as actions from '../../../store/actions/index';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Achat = () => {

    const [checknews,setCheckNews] = useState(false)
    const [checkSocial,setCheckSocial] = useState(false)
    const [name,setName] = useState(null)
    const [show,setShow] = useState(false)
    const [ok, setOk] = useState(false);
    const [ok1, setOk1] = useState(false)

    const dispatch = useDispatch();
    const tchat = useCallback((value) => { 
        dispatch(actions.tchat(value));
    }, [dispatch]);

    useEffect(()=>{
        console.log('DIDMOUNTTTTT-->')
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/social.json/`)
        .then(response => {
            setCheckSocial(response.data.social);
        }).catch(error => {
            //console.log('MAILL//',error)
        })
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/newsletter.json/`)
        .then(response => {
            setCheckNews(response.data.newsletter);
        }).catch(error => {
            //console.log('MAILL//',error)
        })
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/user.json/`)
        .then(response => {setName(response.data.name) })
        .catch(err => {})  
    },[])


    useEffect(()=> {
        if (ok) {
            console.log('DIDUPDATE->')
            const dataTrue = {social:true};
            const dataFalse = {social:false};
          
         checkSocial ? 
         axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/social.json/`,dataTrue)
         .then(res => {
             toast.success("Nous sommes heureux de vous compter parmis nos membres.", {  className: "toastCss" })
             tchat(true)
         })
         .catch(err => {})
     : axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/social.json/`, dataFalse)
         .then(res => {
             toast.error("Nous sommes triste de ne plus vous compter parmis nos membres.", {  className: "toastCss" })
             tchat(false)
         })
         .catch(err => {})

        }
      
    
    },[checkSocial, ok])

    useEffect(()=> {
        if (ok1) {
            console.log('DIDUPDATE-> 111')
            const dataTrue1 = {newsletter:true};
            const dataFalse1 = {newsletter:false};
            checknews ? 
            axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/newsletter.json/`,dataTrue1)
            .then(res => toast.success("Vous etes maintenant abonneer a notre newsletter", {  className: "toastCss" }))
            .catch(err => {})
            : axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/newsletter.json/`,dataFalse1)
            .then(res => toast.error("Vous etes desabonner a notre newsletter", {  className: "toastCss" }))
            .catch(err => {})
        }
    },[checknews, ok1])

    const handleChange = (id) => {
        if(name) {
            setOk(true);
            setOk1(true);
            if (id === 'social') {
                setOk1(false)
               setCheckSocial(prev => !prev);
            }
            else if (id === 'news') {
                setOk(false)
                setCheckNews(prev => !prev);
            }
        }
        else 
             setShow(true)    
    }
      console.log('stattteeee-->',checkSocial)

    let modal;
    if (show === true){
        modal = (
            <div data-aos="zoom-in" data-aos-duration='2000' className='modal2'>
                <Modal.Dialog  className='modalShopping'style={{backgroundColor:'black',color:'white',borderRadius:'10px'}}>
                    <Modal.Header style={{backgroundColor:'black',color:'white'}}>
                        <Modal.Title > Informations manquantes ! </Modal.Title>
                    </Modal.Header>    
                    <Modal.Body style={{backgroundColor:'black',color:'white'}}>
                        <p>Vous devez completer vous information personnel dans votre profil avant de pouvoir profitez de nos services :)</p>
                        <p>Cliquez sur le lien ci-dessous vous serez dirigez vers votre page de profil </p>
                        <Link to='/compte/InfoPerso'style={{display:'flex',justifyContent:'center'}}> Mon Profil </Link>
                    </Modal.Body>  
                </Modal.Dialog>
            </div>
            )
    }

    return (
    <div className='Achat'>
        <ToastContainer transition={Zoom} position="top-center" pauseOnFocusLoss type="dark"/>
            <div className='blockAchat'>
                <div className='blockTitre'>
                     <h1 className='titreInBlock'> Social </h1>
                     {modal}
                </div>
                <div className='blockCarteAchatSocial'>
                    <div className='blockHaut'>
                        <div className='HautblockHaut'>
                            <h3 className='h3'> Rejoignez-nous dès aujourd'hui </h3>
                            <h4> Avantages à devenir membre :</h4>
                        </div>
                        <div className='BasblockHaut'>
                            <div className='BasGaucheblockHaut'>
                                  <ul>
                                    <li className='liSocial'> Prenez part aux discussions sur les films et séries </li>
                                    <li className='liSocial'> Contribuez à améliorer les informations de notre base de données.</li>
                                    <li className='liSocial'> Contribuez à améliorer les informations de notre base de données.</li>
                                    <li className='liSocial'> Profitez des dernieres infos et exclu grace a un communauté reactive</li>
                                </ul>
                            </div>
                            <div className='BasDroiteblockHaut'>
                                <div className='switch'>
                                <Switch onChange={() => handleChange('social')} checked={checkSocial} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='blockBas'>
                        <div className='HautblockHaut'>
                                <h3 > Newsletter </h3>
                        </div>
                        <div className='BasblockHaut1'>
                            <div className='BasGaucheblockHaut1'>
                                <ul>
                                    <li className='liSocial'> Info en exlusivité </li>
                                    <li className='liSocial'> Profitez en exclu des info sur tout les film tendance</li>
                                </ul>
                            </div>
                            <div className='BasDroiteblockHaut'>
                                 <div className='switch'>
                                 <Switch onChange={() => handleChange('news')} checked={checknews} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default Achat;