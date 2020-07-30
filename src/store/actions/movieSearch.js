import * as actionTypes from './actionTypes';
import axios from 'axios';
import { API_KEY, PATH_BASE, PATH_MOVIE, PATH_SEARCH, PATH_PAGE, PATH_ADULT, PATH_LANGUE } from '../../component/Utility/api'



export const movieBegin = () => {
    return {
        type: actionTypes.MOVIE_BEGIN
    };
};


export const movieSearchInput = (value,data) => {
    return {
        type: actionTypes.MOVIE_SEARCH_INPUT,
        movie: value,
        data: data
    };
};

export const moviePopular = (value) => {
    return {
        type: actionTypes.MOVIE_POPULAR,
        movie: value
    };
};

export const movieFiltre = (value) => {
    return {
        type: actionTypes.MOVIE_FILTRE,
        movie: value
    };
};

export const movieFail = (error) => {
    return {
        type: actionTypes.MOVIE_FAIL,
        error: error
    };
};




export const movieSearch = (inputValue,page) => {
    return dispatch => {
        dispatch(movieBegin());
            if (inputValue === "fetchDataPopular"){
                axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=1e32f5c452c2267d5367589e9864ab1c&language=en-US&page=${page}`)
                    .then(response => {
                        //console.log(response.data)
                        dispatch(moviePopular(response.data.results))
                    })
                    .catch(err => {
                        dispatch(movieFail(err))
                        console.log(err.response)
                    })
            }
            else {
                    axios.get(`${PATH_BASE}${PATH_SEARCH}${PATH_MOVIE}${API_KEY}${PATH_PAGE}1${PATH_LANGUE}fr${PATH_ADULT}"&query=${inputValue}`)
                    .then(response => {
                        console.log('rrrrr',response)
                        dispatch(movieSearchInput(response.data.results,response.data.total_results))
                    })
                    .catch(err => {
                        console.log('eeeeee')
                        dispatch(movieFail(err));
                })
            }
                
        }
        
};

export const ConcatMoviePopular= (movie) => {
    return dispatch => {
               console.log('movie',movie)
        }
        
};



export const movieFiltres = (filtreValue) => {
    console.log(filtreValue)
    let fetchApi=`https://api.themoviedb.org/3/discover/movie?api_key=1e32f5c452c2267d5367589e9864ab1c`

    filtreValue.Genre.value ? fetchApi = fetchApi +`&with_genres=${filtreValue.Genre.value}`: null
    filtreValue.SortBy.value ? fetchApi = fetchApi + `&sort_by=${filtreValue.SortBy.value}`: null
    filtreValue.Years.value ? fetchApi = fetchApi + `&primary_release_year=${filtreValue.Years.value}`: null

    return dispatch => {
        dispatch(movieBegin());
         axios.get(fetchApi)
                    .then(response => {
                        console.log('resposne', response)
                        dispatch(movieFiltre(response.data.results))
                    })
                    .catch(err => {
                        dispatch(movieFail(err))
                        console.log(err.response)
                    })
        }      
};