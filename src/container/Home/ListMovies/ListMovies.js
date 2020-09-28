import React from 'react';
import { withRouter } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Movie from './Movie/Movie';
import './ListMovies.css'
import * as actions from '../../../store/actions/index'
import Spinner from '../../../component/UI/Spinner/Spinner'
import { useEffect,useCallback} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import { useHistory } from 'react-router-dom';
import AOS from 'aos'


const Movielist = () => {

const history = useHistory();

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
      AOS.init()
      if (movie.length === 0)
        fetchData()
    }, [movie.length, fetchData])
    

    const fetchImages = () => {
      fetchInfiniteScroll()   
    }

    const clickShowMovieDetail = (id) => {
      history.push(`/movie/${id}`);
      // console.log(history)
      // console.log(id)  
    }  
    return (
              <InfiniteScroll
                 dataLength={movie.length}
                 next={fetchImages}
                 hasMore={hasmore}
              >
                <div className='listmovie'>
                  {movie && movie.map((data) => (
                    <div data-aos="zoom-in" data-aos-duration='2000' key={data.id}>
                          <Movie  image={data.poster_path} data={data.original_title} id={data.id}  title={data.title} click={() => clickShowMovieDetail(data.id)} />
                          </div>
                      ))
                    }
                    {loading? <Spinner text="Chargement en cours veuillez patientez ..."/> : null}
                    {searchBarNoResult=== 0 ? <p style={{textAlign:'center',width:'100%', color:'white'}}> Aucun resultat ne correspond a votre recherche</p>: null}
                </div>
                </InfiniteScroll>
            
        )
}

export default withRouter((Movielist));