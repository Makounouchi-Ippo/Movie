import React from 'react'
import classes from './InfoPerso.css'
import {FaPlusCircle} from 'react-icons/fa'
import {CgProfile} from 'react-icons/cg'
const InfoPerso = () => {
    return (
        <div className={classes.InfoPersos}>
            <h1 style={{fontWeight:'normal',marginTop:'25px'}}> Info persos </h1>
            
                <div className={classes.blockImage1}>
                    <div className={classes.TitreContainer}>
                        <h2 className={classes.titreInContainer}> Image Profil </h2>
                            <div className={classes.blockimage2}>
                                <CgProfile style={{height:'140px', width:'140px'}}/>
                                <div className={classes.blockButtonPhoto}>
                                    <FaPlusCircle className={classes.ButtonPhoto}/>
                                </div>   
                            </div>
                    </div>
                </div>

        </div>
    )
}

export default InfoPerso;