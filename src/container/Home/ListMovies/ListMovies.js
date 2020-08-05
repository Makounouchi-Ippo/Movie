import React from 'react';
import { withRouter } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Movie from './Movie/Movie';
import classes from './ListMovies.css'
import * as actions from '../../../store/actions/index'
import Spinner from '../../../component/UI/Spinner/Spinner'
import { useEffect,useCallback,useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'



const Movielist = () => {


const dispatch = useDispatch();


const movie = useSelector(state => state.movie.movie)
const hasmore = useSelector(state => state.movie.hasmore)
const page = useSelector(state => state.movie.page)
const loading = useSelector(state =>  state.movie.loading)
const searchBarNoResult = useSelector(state =>  state.movie.searchBarNoResult)
const nameScrolling = useSelector(state =>  state.movie.nameScrolling)
const valueInput = useSelector(state =>  state.movie.inputValue)
const optionSelect = useSelector(state =>  state.movie.selectedOption)



const fetchData = useCallback(() => dispatch(actions.movieSearch("fetchDataPopular")),[dispatch])
const fetchInfiniteScroll =  () => dispatch(actions.InfiniteScroll(nameScrolling,page+1,valueInput,optionSelect))


 

    useEffect(() => {
      fetchData()
  
    },
    [fetchData])
    

    const fetchImages = () => {
      fetchInfiniteScroll()   
    }

    return (
            
              <InfiniteScroll
                 dataLength={movie.length}
                 next={fetchImages}
                 hasMore={hasmore}
              >
                <div className={classes.listmovie}>
                  {movie && movie.map((data,index) => (
                          <Movie key={index} image={data.poster_path} data={data.original_title}  />
                      ))
                    }
                    {loading? <Spinner text="Chargement des film populaire veuillez patientez !"/> : null}
                    {searchBarNoResult=== 0 ? <p style={{textAlign:'center',width:'100%', color:'white'}}> Aucun resultat ne correspond a votre recherche</p>: null}
                </div>
                </InfiniteScroll>
            
        )
}

export default withRouter((Movielist));