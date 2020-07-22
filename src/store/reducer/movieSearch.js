import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    movie: null,
    loading: false,
    error: null
  };
  

  const movieBegin = (state) => {
    return updateObject( state, {
        loading: true,
        error: null
     } );
  };

  const movieSearchInput = (state, action) => {
    return updateObject( state, {
        loading: false,
        movie: action.movie
     } );
  };

  const moviePopular = (state, action) => {
    console.log(state)
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
        case actionTypes.MOVIE_FAIL: return movieFail(state, action);
        default:
            return state;
    }
  };
  export default reducer;