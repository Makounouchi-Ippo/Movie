import * as actionTypes from './actionTypes';
import axios from 'axios';
import { API_KEY, PATH_BASE, PATH_MOVIE, PATH_SEARCH, PATH_PAGE, PATH_ADULT, PATH_LANGUE } from '../../component/Utility/api'



export const movieBegin = () => {
    return {
        type: actionTypes.MOVIE_BEGIN
    };
};


export const movieSearchInput = (value) => {
    return {
        type: actionTypes.MOVIE_SEARCH_INPUT,
        movie: value,
    };
};

export const moviePopular = (value) => {
    return {
        type: actionTypes.MOVIE_POPULAR,
        movie: value
    };
};


export const movieFail = (error) => {
    return {
        type: actionTypes.MOVIE_FAIL,
        error: error
    };
};




export const movieSearch = (inputValue) => {
    return dispatch => {
        dispatch(movieBegin());
            if (inputValue === "fetchData"){
                axios.get('https://api.themoviedb.org/3/movie/popular?api_key=1e32f5c452c2267d5367589e9864ab1c&language=en-US&page=1')
                    .then(response => {
                        console.log('resssssponse====',response)
                        dispatch(moviePopular(response.data.results))
                    })
                    .catch(err => {
                        dispatch(movieFail(err))
                        console.log(err.response)
                    })
            }
            else {
                    console.log(111111111111111)
                    axios.get(`${PATH_BASE}${PATH_SEARCH}${PATH_MOVIE}${API_KEY}${PATH_PAGE}1${PATH_LANGUE}fr${PATH_ADULT}"&query=${inputValue}`)
                    .then(response => {
                        dispatch(movieSearchInput(response.data.results))
                    })
                    .catch(err => {
                        console.log(err.response)
                        dispatch(movieFail(err));
                })
            }
                
        }
        
};
