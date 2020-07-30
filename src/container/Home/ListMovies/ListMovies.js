import React from 'react';
import { withRouter } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Movie from './Movie/Movie';
import classes from './ListMovies.css'
import * as actions from '../../../store/actions/index'
import Spinner from '../../../component/UI/Spinner/Spinner'
import { useEffect, useState,useCallback, useRef} from 'react';



const Movielist = () => {

const dispatch = useDispatch();

const movie = useSelector(state => state.movie.movie)
const page = useSelector(state => state.movie.page)
const loading = useSelector(state =>  state.movie.loading)
const searchBarNoResult = useSelector(state =>  state.movie.searchBarNoResult)


const fetchData = useCallback(() => dispatch(actions.movieSearch("fetchDataPopular",page)),[dispatch])
const ConcatMoviePopular =  (page) => dispatch(actions.ConcatMoviePopular(page))


   const  handleScroll = (event) => {
     console.log(window)
    }

//const prevProps = useRef(movie);
    useEffect(() => {
      fetchData("fetchDataPopular",page)
    },
    [fetchData])
    
    return (
            <div className={classes.listmovie}  onScroll={handleScroll}>
                    {movie && movie.map((data,index) => (
                          <Movie key={index} image={data.poster_path} data={data.original_title}  />
                      ))
                    }
                    {loading? <Spinner text="Chargement des film populaire veuillez patientez !"/> : null}
                    {searchBarNoResult=== 0 ? <p style={{textAlign:'center',width:'100%', color:'white'}}> Aucun resultat ne correspond a votre recherche</p>: null}
                
            </div>
        )
}

export default withRouter((Movielist));