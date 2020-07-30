import React from 'react';
import {Card , Button} from 'react-bootstrap'
import Affiche from '../../../../assets/images/affiche_non_disponible.png'
import classes from './Movie.css'

 const Movie = (props) => {

    let movie;

    props.image === null ? movie = ( 
        <Card style={{ width: '15rem', height: '26rem' }}>
            <Card.Img variant="top" src={Affiche} alt='card movie'  />
            <Button variant="primary">Voir film</Button>
        </Card>):movie = ( 
        <Card style={{ width: '15rem', height: '26rem' }}>
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${props.image}`} alt='card movie'  />
            <Button variant="primary">Voir film</Button>
        </Card>
 )


    return (
        <div className={classes.MovieCard}>
            {movie}
        </div>
  )
}

export default (Movie);