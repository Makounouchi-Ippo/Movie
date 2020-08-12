import React from 'react';
import {Card} from 'react-bootstrap'
import classes from './Movie.css'

 const Movie = (props) => {

    let movie;

   props.image !== null ? movie = ( 
        <div className={classes.MovieCard}>
            <Card style={{ width: '275px', height: '400px' ,backgroundColor:'black'}}>
                <Card.Img style={{ width: '275px', height: '400px'}} variant="top" src={`https://image.tmdb.org/t/p/w500${props.image}`} alt='card movie' id={props.id} onClick={props.click}/>
            </Card>
        </div>
    ):null;

    return (
        <div>
            {movie}
        </div>
    )
}

export default (Movie);