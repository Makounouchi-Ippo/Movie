import React from 'react';
import { withRouter } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../store/actions/index'
import { useEffect} from 'react';
import classes from './MovieDetail.css'
import ImagePlay from './ImagePlay/ImagePLay'
import InfoMovie from './InfoMovie/InfoMovie'
import Acteurs from './Acteurs/Acteurs'
import SimilarMovie from './SimilarMovie/SimilarMovie'
import AOS from 'aos';
import 'aos/dist/aos.css'



const MovieDetail = (props) => {

  const dispatch = useDispatch();
  const moviedetail = useSelector(state => state.movie.movieDetail);
  const youtubeKey_release = useSelector(state => state.movie.youtubeKey_release);
  const fetchMovieDetail =  () => dispatch(actions.movieSearch('showMovieDetail',props.match.params.id))
  
  useEffect(() => {
    AOS.init()
    window.scrollTo(0,0)
    fetchMovieDetail()
  },
  [])


   console.log('movieeeDetail==',moviedetail)
    return (
      <div data-aos='fade-up' data-aos-duration='2000' className={classes.MovieDetail}>
        {moviedetail && youtubeKey_release && <ImagePlay afficheFilm={moviedetail.backdrop_path} bandeAnnonce={youtubeKey_release.youtube} date={youtubeKey_release.date} titre={moviedetail.original_title} afficheFilm2={moviedetail.poster_path} id={moviedetail.id}/> } 
        {moviedetail && <InfoMovie duree={moviedetail.runtime} popularite={moviedetail.popularity} genre= {moviedetail.genres} vote={moviedetail.vote_average*10} synopsys={moviedetail.overview} pays ={moviedetail.production_countries} /> }
        {moviedetail && <Acteurs data={moviedetail.credits.cast} title="Acteurs" /> }
        {moviedetail && <Acteurs data={moviedetail.credits.crew} title="Equipe Technique" /> }
        {moviedetail &&  <SimilarMovie/>}
      </div>  
            
        )
}

export default withRouter((MovieDetail));