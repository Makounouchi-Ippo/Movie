import React from 'react'
import classes from './InfoPerso.css'
import ImageProfil from '../InfoPerso/ImageProfil/ImageProfil'
import FormUser from './FormUser/FormUser'
import CarteBleu from './CarteBleu/CarteBleu'

const InfoPerso = () => {
    return (
        <div className={classes.InfoPersos}>
           <ImageProfil/>
           <FormUser/>
           <CarteBleu/>
        </div>
    )
}

export default InfoPerso;