import React, { useState, useEffect, useCallback  } from 'react'
import {useDispatch} from 'react-redux'
import './Social.css'
import Switch from "react-switch";
import {Modal} from 'react-bootstrap'
import  * as actions from '../../../store/actions/index';
import {Link } from 'react-router-dom';
import axios from 'axios'

const Achat = () => {
    const [checknews,setCheckNews] = useState(false)
    const [checkSocial,setCheckSocial] = useState(false)
    const [name,setName] = useState('')
    const [mail,setMail] = useState('')
    const [show,setShow] = useState(false)
    const [ok, setOk] = useState(false);
    const dispatch = useDispatch();
    const tchat = useCallback((value) => { 
        dispatch(actions.tchat(value));
    }, [dispatch]);

    useEffect(()=>{
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/social.json/`)
        .then(response => {
            setCheckSocial(response.data.social);
        }).catch(error => {
        })
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/newsletter.json/`)
        .then(response => {
            setCheckNews(response.data.newsletter);
        }).catch(error => {
        })
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/user.json/`)
        .then(response => {setName(response.data.name) })
        .catch(err => {})  
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/mail.json/`)
    .then(res => {
        console.log(res.data.mail)
        setMail(res.data.mail);})
    .catch(error => {
        setMail(localStorage.getItem('mail'))
    })
    },[])


    useEffect(()=> { 
    const dataTrue = {social:true};
    const dataFalse = {social:false};    
    checkSocial ? axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/social.json/`,dataTrue).then(res=>{
        tchat(true)
     }) : axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/social.json/`,dataFalse).then(res=>{
        tchat(false)
     });
    
    },[checkSocial,tchat])

    useEffect(()=> {
        if (ok) {
            const dataTrue1 = {newsletter:true};
            const dataFalse1 = {newsletter:false};
            checknews ? axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/newsletter.json/`,dataTrue1)
            .then(res=>{
            const templateId = 'template_8autyof';
            sendFeedback(templateId, {message_html: 'message_html', from_name: name, reply_to: mail});
            }): axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/newsletter.json/`,dataFalse1).then(res=>{
            })
        }
    

    },[checknews,ok,checknews])

    const sendFeedback = (templateId, variables) => {
        window.emailjs.send('user_sPd6aG1e3xdkcQxMwXU', templateId,variables)
        .then(res => {})
        .catch(err => {})
    }

    const handleChange = (id) => {
    if(name){
        setOk(false)
        if (id === 'social') {
            setCheckSocial(prev => !prev);
        }
        else if (id === 'news') {
            setOk(true)
            setCheckNews(prev => !prev);
        }
    } 
    else 
        setShow(true)    
    }
        
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
                   {!localStorage.getItem('photoPhone')  && <div className='blockBas'>
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
                    </div>}
                </div>
            </div>
    </div>
    )
}

export default Achat;