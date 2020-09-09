import * as actionTypes from './actionTypes';
import axios from 'axios';
import firebase from '../../fire'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};
export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const modalFalse = () =>{
    return {
        type: actionTypes.MODAL_FALSE,
    }
}

export const authLogout = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('photo')
    localStorage.removeItem('email')
    localStorage.removeItem('social')
    return {
        type: actionTypes.AUTH_LOGOUT,

    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(authLogout())
        },expirationTime*100000000000)
    }
}

export const socialTwitter = (provider,history) => {
    return dispatch => {
        dispatch(authStart());
        firebase.auth().signInWithPopup(provider)
        .then(response => {
            //console.log('socailllAUUUUTHHHHH',response)
            //console.log('33',response.user)
            localStorage.setItem('id', response.user.uid)
            localStorage.setItem('token', response.credential.accessToken)
            localStorage.setItem('name', response.user.displayName)
            localStorage.setItem('photo', response.additionalUserInfo.profile.profile_image_url)
            localStorage.setItem('email', response.user.email)
            localStorage.setItem('show', true)
            localStorage.setItem('animation', true)
            //localStorage.setItem('toolbar', true)
            dispatch(authSuccess(response.credential.idToken, response.user.uid));
            history.push('/home');
        })
        .catch(err => {
            //console.log('eerrrr msg = ', err.message)
            dispatch(authFail(err.message));
        })
    };
}

export const socialAuth = (provider,history) => {
    return dispatch => {
        dispatch(authStart());
        firebase.auth().signInWithPopup(provider)
        .then(response => {
            console.log('socailllAUUUUTHHHHH',response)
            console.log('33',response.user)
            localStorage.setItem('id', response.user.uid)
            localStorage.setItem('token', response.credential.accessToken)
            localStorage.setItem('name', response.user.displayName)
            localStorage.setItem('photo', response.user.photoURL)
            localStorage.setItem('email', response.user.email)
            localStorage.setItem('show', true)
            localStorage.setItem('animation', true)
            //localStorage.setItem('toolbar', true)
            dispatch(authSuccess(response.credential.idToken, response.user.uid));
           history.push('/home'); 
        })
        .catch(err => {
            console.log('eerrrr msg = ', err.message)
            dispatch(authFail(err.message));
        })
    };
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJQ2C-WHsJXu5xVCG5Z98XQ31gRJrSV_E',authData)
        .then(response => {
            console.log('tokkkennnnnn',response);
            localStorage.setItem('id', response.data.localId)
            localStorage.setItem('show', true)
            localStorage.setItem('animation', true)
            //localStorage.setItem('toolbar', true) 
            dispatch(authSuccess(null, response.data.localId));
        })
        .catch(err => {
            console.log(err.response)
            dispatch(authFail(err.response.data.error.message));
        })
    };
};

export const  authLog = (email, password, history) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
     
       axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJQ2C-WHsJXu5xVCG5Z98XQ31gRJrSV_E', authData)
        .then(response => {
            console.log('authlogAction',response);
            localStorage.setItem('mail',response.data.email);
            localStorage.setItem('social',false)
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('id', response.data.localId)
            localStorage.setItem('show', true)
            localStorage.setItem('animation', true)
            //localStorage.setItem('toolbar', true)
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn))  
             
            history.push('/home');
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error.message));
        })

        // const verify = {
        //     requestType:"VERIFY_EMAIL",
        //     idToken:localStorage.getItem('token')
        // }
        // console.log('verifier',verify)
        // axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDJQ2C-WHsJXu5xVCG5Z98XQ31gRJrSV_E',verify)
        // .then(e=>{ console.log(e)})
        // .catch(e=>{console.log(e)})
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        localStorage.removeItem('show')
       
        // localStorage.removeItem('animation');
       // localStorage.removeItem('toolbar')
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id')
        if (!token)
            dispatch(authLogout());
           
        else
            dispatch(authSuccess(token,id));        
    };
};
