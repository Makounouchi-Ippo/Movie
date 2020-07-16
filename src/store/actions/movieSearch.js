import * as actionTypes from './actionTypes';
import axios from 'axios';
import { API_KEY, PATH_BASE, PATH_DISCOVER, PATH_MOVIE, PATH_SEARCH, PATH_PAGE, PATH_ADULT, PATH_LANGUE } from '../../component/Utility/api'




export const movieSuccess = (value) => {

    return {
        type: actionTypes.MOVIE_SUCCESS,
        movie: value,
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
        axios.get(`${PATH_BASE}${PATH_SEARCH}${PATH_MOVIE}${API_KEY}${PATH_PAGE}1${PATH_LANGUE}fr${PATH_ADULT}"&query=${inputValue}`)
        .then(response => {
            dispatch(movieSuccess(response.data.results))
            
        })
        .catch(err => {
            console.log(err.response)
            dispatch(movieFail(err));
        })

        
    };
};
