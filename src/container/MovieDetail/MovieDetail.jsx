import React from 'react';
import { withRouter } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../store/actions/index'
import { useEffect} from 'react';
import classes from './MovieDetail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlayCircle } from '@fortawesome/free-solid-svg-icons'


const MovieDetail = (props) => {

  const dispatch = useDispatch();
  const moviedetail = useSelector(state => state.movie.movieDetail);
  const fetchMovieDetail =  () => dispatch(actions.movieSearch('showMovieDetail',props.match.params.id))
  
  useEffect(() => {
    fetchMovieDetail()
  },
  [])


 

    return (
         <div className={classes.images} >
              <img className={classes.image} src={`https://image.tmdb.org/t/p/original/${moviedetail.backdrop_path}`} alt={moviedetail.id}/>
               <FontAwesomeIcon style ={{position:'absolute',color:'gold',height:'100px',width:'100px',top:'38%', cursor:'pointer'}} icon={faPlayCircle} />
          </div> 
             
            
        )
}

export default withRouter((MovieDetail));