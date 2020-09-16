import React from 'react'
import './Achat.css'
import {Card} from 'react-bootstrap'
import photo from '../../../assets/images/netflix-logo.jpg'

const Achat = () => {
    return (
    <div className='Achat'>
            <div className='blockAchat'>
                <div className='blockTitre'>
                     <h1 className='titreInBlock'> Achats </h1>
                </div>
                <div className='blockCarteAchat'>
                    <div className='blockCarte'>
                           <Card.Img  className='cardAchat' src={photo} alt='card movie' />
                           <Card.Img  className='cardAchat' src={photo} alt='card movie' />
                           <Card.Img  className='cardAchat' src={photo} alt='card movie' />
                           <Card.Img  className='cardAchat' src={photo} alt='card movie' />
                           <Card.Img  className='cardAchat' src={photo} alt='card movie' />
                           <Card.Img  className='cardAchat' src={photo} alt='card movie' />
                           <Card.Img  className='cardAchat' src={photo} alt='card movie' />
                           <Card.Img  className='cardAchat' src={photo} alt='card movie' />
                           <Card.Img  className='cardAchat' src={photo} alt='card movie' />
                           <Card.Img  className='cardAchat' src={photo} alt='card movie' />
                           <Card.Img  className='cardAchat' src={photo} alt='card movie' />
                           <Card.Img  className='cardAchat' src={photo} alt='card movie' />
                    </div>
                </div>
            </div>
    </div>
    )
}

export default Achat;