import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    movie: [],
    loading: false,
    error: null,
    page: 1,
    loadMovie: true,
    searchBarNoResult:1
  };
  

  const movieBegin = (state) => {
    return updateObject( state, {
        loading: true,
        error: null
     } );
  };

  const movieSearchInput = (state, action) => {
    console.log(action)
    return updateObject( state, {
        loading: false,
        movie: action.movie,
        searchBarNoResult: action.data
     } );
  };

  const moviePopular = (state, action) => {
    localStorage.setItem('movie',JSON.stringify(action.movie))
    return updateObject( state, {
        loading: false,
        movie: action.movie
     } );
  };

  const movieFiltre = (state, action) => {
    return updateObject( state, {
        loading: false,
        movie: action.movie
     } );
  };

  const movieFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
    });
  }


  const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.MOVIE_BEGIN: return movieBegin(state,action);
        case actionTypes.MOVIE_SEARCH_INPUT: return movieSearchInput(state, action);
        case actionTypes.MOVIE_POPULAR: return moviePopular(state, action);
        case actionTypes.MOVIE_FILTRE: return movieFiltre(state, action);
        case actionTypes.MOVIE_FAIL: return movieFail(state, action);
        default:
            return state;
    }
  };
  export default reducer;