import React from 'react'
import './Social.css'
import Switch from "react-switch";

const Achat = () => {
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
                                  <Switch  />
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
                                    <Switch/>
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