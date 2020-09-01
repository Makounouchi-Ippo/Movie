import React from 'react';
import Coverflow from 'react-coverflow';
import photo from '../../../assets/images/affiche_non_disponible.png'


const SimilarMovie = (props) => {

    console.log('similar',props.similarMovie.results.length)

    let image;



    if (props.similarMovie.results.length === 0){
      return( <div></div>)
    }
        

   else{
    image =  props.similarMovie.results.slice(0,5).map((movie,index)=>{
      console.log('PUTINNNNNN',movie)
      return (
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='' id={index}/>  
      )
    }
  )} 
      return (
      <div style={{width:'69%',margin:'auto',marginTop:'50px',paddingBottom:'15px',height:'700px',marginBottom:'10px'}} >
          <h5 style={{color:'white'}}> Films similaires: </h5>
        <Coverflow width="350" height="650" marginTop="80px"
              style={{backgroundColor:'red'}}
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
  
  export default (SimilarMovie);