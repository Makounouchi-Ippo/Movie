import React, { useState, useEffect } from 'react'
import './Social.css'
import Switch from "react-switch";
import {Modal} from 'react-bootstrap'
import { useHistory,Link } from 'react-router-dom';
import axios from 'axios'

const Achat = () => {

    const [checknews,setCheckNews] = useState(false)
    const [checkSocial,setCheckSocial] = useState(false)
    const [name,setName] = useState(null)
    const [show,setShow] = useState(false)

    //   const  handleSubmit = (val) => {
    

    //     if (val === true)
    //     {
    //         console.log('val--->',val)
    //         setCheckSocial(false)
    //     }

    //     if (val === false){
    //         console.log('val--->',val)
    //         setCheckSocial(false)

    //     }
    //     // const templateId = 'template_8autyof';
    
    //     // sendFeedback(templateId, {message_html: 'this.state.feedback', from_name: 'this.state.name', reply_to: 'mehdielkaddouri@gmail.com'})

    //   }

    //   const sendFeedback = (templateId, variables) => {
    //     window.emailjs.send(
    //       'user_sPd6aG1e3xdkcQxMwXU', templateId,
    //       variables
    //       ).then(res => {
    //         console.log('Email successfully sent!')
    //       })
    //       // Handle errors here however you like, or use a React error boundary
    //       .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    //   }

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
        console.log('DIDUPDATE->')
        const dataTrue = {social:true};
        const dataFalse = {social:false};
      
     checkSocial ? axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/social.json/`,dataTrue) : axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/social.json/`,dataFalse);
    
    },[checkSocial])

    useEffect(()=> {
        console.log('DIDUPDATE-> 111')
        const dataTrue1 = {newsletter:true};
        const dataFalse1 = {newsletter:false};
        checknews ? axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/newsletter.json/`,dataTrue1) : axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/newsletter.json/`,dataFalse1);

    },[checknews])

    

    const handleChange = (id) => {
    if(name){
        if (id === 'social') {
            setCheckSocial(prev => !prev);
        }
        else if (id === 'news') {
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