import React from 'react';
import Coverflow from 'react-coverflow';
import { withRouter } from 'react-router-dom';
import './SimilarMovie.css'

const SimilarMovie = (props) => {
    console.log('similar',props.similarMovie.results.length)
    let image;

    if (props.similarMovie.results.length === 0){
      return(0)
    }

   else {
    image =  props.similarMovie.results.slice(0,5).map((movie,index)=>( 
         <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='' key={index} onClick={(e) => {e.preventDefault(); props.history.push(`/movie/${movie.id}`)}}/> 
      ))}
    
    return (
      <div className='blockSimilarMovie' >
        <h5 style={{color:'white'}}> Films similaires: </h5>
        <Coverflow width="350" height="850" marginTop="80px"
              className='coverflow'
              displayQuantityOfSide={2}
              navigation
              infiniteScroll
              enableHeadingg
              >
            {image}
        </Coverflow> 
      </div>
     )
  }
  
  export default withRouter((SimilarMovie));