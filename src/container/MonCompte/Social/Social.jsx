import React, { useState } from 'react'
import './Social.css'
import Switch from "react-switch";

const Achat = () => {

    const [checknews,setCheckNews] = useState(false)
    const [checkSocial,setCheckSocial] = useState(false)

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
    const handleChange = (id) => {
        if (id === 'social') {
            setCheckSocial(prev => !prev);
        }
        else if (id === 'news') {
            setCheckNews(prev => !prev);
        }
    }
      console.log('stattteeee-->',checkSocial)

    return (
    <div className='Achat'>
            <div className='blockAchat'>
                <div className='blockTitre'>
                     <h1 className='titreInBlock'> Social </h1>
                </div>
                <div className='blockCarteAchat'>
                    <div className='blockHaut'>
                        <div className='HautblockHaut'>
                            <h3 className='h3'> Rejoignez-nous dès aujourd'hui </h3>
                            <h4> Avantages à devenir membre :</h4>
                        </div>
                        <div className='BasblockHaut'>
                            <div className='BasGaucheblockHaut'>
                                  <ul>
                                    <li> Prenez part aux discussions sur les films et séries </li>
                                    <li> Contribuez à améliorer les informations de notre base de données.</li>
                                    <li> Profitez des dernieres infos et exclu grace a un communauté reactive</li>
                                    <li> Profitez des dernieres infos et exclu grace a un communauté reactive</li>
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
                                    <li> Info en exlusivité </li>
                                    <li> Profitez en exclu des info sur tout les film tendance</li>
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