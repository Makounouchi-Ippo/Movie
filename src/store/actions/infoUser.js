import * as actionTypes from '../actions/actionTypes';
import axios from 'axios'

export const infoUserSuccess = (data) => {
    return {
        type: actionTypes.INFO_USER_SUCCESS,
        data: data
    };
};

export const infoUserFail = (error) => {
    return {
        type: actionTypes.INFO_USER_FAIL,
        error: error
    };
};


export const formUser = (dataform,datamail, mail) => {
    let id;
    id = localStorage.getItem('id')
    return dispatch => {
        if (mail = "mail")
        {  
            axios.put(`https://movies-27cd5.firebaseio.com/${id}/user.json/`,dataform)
            .then(response => {
                console.log('data',response.data); 
                dispatch(infoUserSuccess(response.data));        
            })
            .catch(err => {
                console.log('data',err.response)
                dispatch(infoUserFail(err.response));
            })   
        }
        else
        {
            axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDJQ2C-WHsJXu5xVCG5Z98XQ31gRJrSV_E',datamail)
            .then(response => {
                console.log('maillllllllll',response);
                dispatch(infoUserSuccess(response.data));            
            })
            .catch(err => {
                console.log('maillllll',err.response)
                dispatch(infoUserFail(err.response));
            })      
        }
    };
};
