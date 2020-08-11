import React from 'react';
import {Card , Button} from 'react-bootstrap'
import Affiche from '../../../../assets/images/affiche_non_disponible.png'
import classes from './MovieCard.css'

 const Movie = (props) => {
    let movie;

    movie = ( 
        <Card style={{ width: '15rem', height: '26rem' }}>
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${props.image}`} alt='card movie' id={props.id} />
            <Button variant="primary" onClick={props.click} >Voir film</Button>
        </Card>
 )


    return (
        <div className={classes.MovieCard}>
            {movie}
        </div>
  )
}

export default (Movie);