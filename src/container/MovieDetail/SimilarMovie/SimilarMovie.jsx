import React from 'react';
import Slider from 'react-slick';
import { withRouter } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './SimilarMovie.css'

const SimilarMovie = (props) => {
  var settings = {
      width: '80%',
      dots: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 1000,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 780,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          }
        },
        {
          breakpoint: 510,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
          }
        }
      ]
    };
  
    let image;

    if (props.similarMovie.results.length === 0){
      return(0)
    }

   else {
    image =  props.similarMovie.results.slice(0,10).filter(movie => movie.poster_path !== null).map((movie)=>( 
         <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="ImgSimilar" alt='' key={movie.id} onClick={(e) => {e.preventDefault(); props.history.push(`/movie/${movie.id}`)}}/> 
      ))}
    
    return (
      <div className='blockSimilarMovie' >
        <h5 style={{color:'white'}}> Films similaires: </h5>
        <Slider {...settings}>
          {image}
        </Slider>
      </div>
     )
  }
  
  export default withRouter((SimilarMovie));


