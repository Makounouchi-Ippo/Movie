import React from 'react';
import {Card} from 'react-bootstrap'
import affiche from '../../../../assets/images/affiche_non_disponible.png'
import classes from './Movie.css'

 const Movie = (props) => {

    let movie;

   props.image !== null ? movie = ( 
        <div className={classes.MovieCard}>
                <Card.Img style={{ width: '275px', height: '400px'}} variant="top" src={`https://image.tmdb.org/t/p/w500${props.image}`} alt='card movie' id={props.id} onClick={props.click}/>
        </div>
    ):movie = ( 
        <div className={classes.MovieCard}>
                <Card.Img style={{ width: '275px', height: '400px'}} variant="top" src={affiche} alt='card movie' id={props.id} onClick={props.click}/>
                <div style={{ width: '275px', padding:'5px', position:'absolute', margin:'auto', bottom:'25px',textAlign:'center'}}>{props.title}</div>
        </div>)

    return (
        <div>
            {movie}
        </div>
    )
}

export default (Movie);