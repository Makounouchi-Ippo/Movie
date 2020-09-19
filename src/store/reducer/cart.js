import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    cart: [],
    total: 0,
    qte: 0
};

const addToCart = (state, action) => {
    let noSimilarFilm = true;
    let tempCart = state.cart.map(cartItem => {
        if (cartItem.id === action.movie.id) {
            cartItem = { ...cartItem, qte: cartItem.qte + 1 };
            noSimilarFilm = false
        }    
        return cartItem;
    })
    if (noSimilarFilm) {
        tempCart = [...state.cart];
        let value = {
            title: action.movie.title,
            price: 9.99,
            id: action.movie.id,
            qte: 1,
            img: action.movie.poster_path,
            duree: action.movie.runtime,
            note: action.movie.vote_average
        }
        tempCart.push(value)
    }
    return { ...state, cart: tempCart }
}

const removeToCart = (state, action) => {
    return updateObject( state, { 
        cart: state.cart.filter((cartItem) => cartItem.id !== action.id)
    })
}

const resetCart = (state ) => {
    return updateObject( state, { 
      cart: []
    })
}

const increase = (state, action) => {
    let tempCart = state.cart.map(cartItem => {
        if (cartItem.id === action.id)
            cartItem = { ...cartItem, qte: cartItem.qte + 1 };
        return cartItem;
    })
    return { ...state, cart: tempCart }
}

const decrease = (state, action) => {
    let tempCart = state.cart.map(cartItem => {
        if (cartItem.id === action.id)
            cartItem = { ...cartItem, qte: cartItem.qte - 1 };
        return cartItem;
    })
    return { ...state, cart: tempCart }
}

const getTotals = (state) => {
    let { total, qte } = state.cart.reduce(
        (cartTotal, cartItem) => {
            const itemTotal = cartItem.price * cartItem.qte;
            cartTotal.total += itemTotal;
            cartTotal.qte += cartItem.qte;
            return cartTotal;
        },
        {
            total: 0,
            qte: 0
        }
    );
    total = parseFloat(total.toFixed(2));
    return {...state, total, qte}
}

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.ADD_TO_CART: return addToCart(state, action);
    case actionTypes.REMOVE_TO_CART: return removeToCart(state, action);
    case actionTypes.RESET_CART: return resetCart(state, action);
    case actionTypes.INCREASE: return increase(state, action);
    case actionTypes.DECREASE: return decrease(state, action);
    case actionTypes.GET_TOTAL: return getTotals(state);
    default: return state;
  }
}; 

export default reducer;