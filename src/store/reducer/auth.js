import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    modal: false,
    photo: null,
    toolbar:false,
    tchat: false
  };
  const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
  };
  const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
        modal: true
     } );
  };
  const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
  }

  const authLogout = (state) => {
    return updateObject(state, {
        token: null,
        userId: null
    });
};

const tchat = (state, action) => {
  return updateObject(state, {
    tchat : action.value
  });
}

const toolbar = (state,action) => {
  return updateObject(state, {
      toolbar: action.toolbar
  });
};

const photo = (state, action) => {
  return updateObject(state, {
    photo : action.photo
});
}


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state);
        case actionTypes.PHOTO: return photo(state, action);
        case actionTypes.TOOLBAR: return toolbar(state, action);
        case actionTypes.TCHAT: return tchat(state, action);
        default:
            return state;
    }
};
  export default reducer;