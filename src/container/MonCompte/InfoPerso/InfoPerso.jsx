import React from 'react'
import'./InfoPerso.css'
import ImageProfil from '../InfoPerso/ImageProfil/ImageProfil'
import FormUser from './FormUser/FormUser'
import CarteBleu from './CarteBleu/CarteBleu'

const InfoPerso = () => {
    return (
        <div className='InfoPersos'>
           <ImageProfil/>
           <FormUser/>
           <CarteBleu/>
        </div>
    )
}

export default InfoPerso;