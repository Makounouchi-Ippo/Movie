import React from 'react';
import {Card , Button} from 'react-bootstrap'
import classes from './Movie.css'

 const Movie = (props) => {

    return (
        <div className={classes.MovieCard}>
            <Card style={{ width: '15rem', height: '26rem' }}>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${props.image}`} alt='card movie'  />
                <Button variant="primary">Voir film</Button>
            </Card>
         </div>
  )
}

export default (Movie);