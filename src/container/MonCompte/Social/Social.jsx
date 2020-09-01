import React from 'react'
import classes from './Social.css'
import Switch from "react-switch";

const Achat = () => {
    return (
    <div className={classes.Achat}>
            <div className={classes.blockAchat}>
                <div className={classes.blockTitre}>
                     <h1 className={classes.titreInBlock}> Social </h1>
                </div>
                <div className={classes.blockCarteAchat}>
                    <div className={classes.blockHaut}>
                        <div className={classes.HautblockHaut}>
                            <h3 className={classes.h3}> Rejoignez-nous dès aujourd'hui </h3>
                            <h4> Avantages à devenir membre :</h4>
                        </div>
                        <div className={classes.BasblockHaut}>
                            <div className={classes.BasGaucheblockHaut}>
                                  <ul>
                                    <li> Prenez part aux discussions sur les films et séries </li>
                                    <li> Contribuez à améliorer les informations de notre base de données.</li>
                                    <li> Profitez des dernieres infos et exclu grace a un communauté reactive</li>
                                    <li> Profitez des dernieres infos et exclu grace a un communauté reactive</li>
                                </ul>
                            </div>
                            <div className={classes.BasDroiteblockHaut}>
                                <div className={classes.switch}>
                                  <Switch  />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.blockBas}>
                        <div className={classes.HautblockHaut}>
                                <h3 > Newsletter </h3>
                        </div>
                        <div className={classes.BasblockHaut1}>
                            <div className={classes.BasGaucheblockHaut1}>
                                <ul>
                                    <li> Info en exlusivité </li>
                                    <li> Profitez en exclu des info sur tout les film tendance</li>
                                </ul>
                            </div>
                            <div className={classes.BasDroiteblockHaut}>
                                 <div className={classes.switch}>
                                    <Switch  onColor="#DC143C"/>
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