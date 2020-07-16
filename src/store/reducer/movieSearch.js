import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    movie: null
  };
  
  const movieSuccess = (state, action) => {
    return updateObject( state, {
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
        case actionTypes.MOVIE_SUCCESS: return movieSuccess(state, action);
        case actionTypes.MOVIE_FAIL: return movieFail(state, action);   
        default:
            return state;
    }
  };
  export default reducer;