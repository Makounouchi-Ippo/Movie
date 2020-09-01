import React from 'react'
import classes from './Achat.css'
import {Card} from 'react-bootstrap'
import photo from '../../../assets/images/netflix-logo.jpg'

const Achat = () => {
    return (
    <div className={classes.Achat}>
            <div className={classes.blockAchat}>
                <div className={classes.blockTitre}>
                     <h1 className={classes.titreInBlock}> Achats </h1>
                </div>
                <div className={classes.blockCarteAchat}>
                    <div className={classes.blockCarte}>
                           <Card.Img  className={classes.card} src={photo} alt='card movie' />
                           <Card.Img  className={classes.card} src={photo} alt='card movie' />
                           <Card.Img  className={classes.card} src={photo} alt='card movie' />
                           <Card.Img  className={classes.card} src={photo} alt='card movie' />
                           <Card.Img  className={classes.card} src={photo} alt='card movie' />
                           <Card.Img  className={classes.card} src={photo} alt='card movie' />
                           <Card.Img  className={classes.card} src={photo} alt='card movie' />
                           <Card.Img  className={classes.card} src={photo} alt='card movie' />
                           <Card.Img  className={classes.card} src={photo} alt='card movie' />
                           <Card.Img  className={classes.card} src={photo} alt='card movie' />
                           <Card.Img  className={classes.card} src={photo} alt='card movie' />
                           <Card.Img  className={classes.card} src={photo} alt='card movie' />
                           
                    </div>

                </div>
            </div>
    </div>
    )
}

export default Achat;