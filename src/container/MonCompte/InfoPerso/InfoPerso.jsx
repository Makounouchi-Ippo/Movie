import React from 'react'
import classes from './InfoPerso.css'
import ImageProfil from '../InfoPerso/ImageProfil/ImageProfil'
import FormUser from './FormUser/FormUser'

const InfoPerso = () => {
    return (
        <div className={classes.InfoPersos}>
           <ImageProfil/>
           <FormUser/>
        </div>
    )
}

export default InfoPerso;