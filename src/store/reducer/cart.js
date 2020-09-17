import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    cart: [],
    total: 0,
    qte: 0
};

const addToCart = (state, action) => {
    console.log('oooooooo==',action)
    let tab = [...state.cart];

    let value = {
        title: action.movie.title,
        price: 9.99,
        note: action.movie.vote_average,
        id: action.movie.id,
        qte: 1,
        img: action.movie.poster_path,
        duree: action.movie.runtime,
        pays: action.movie.production_countries[0].iso_3166_1
    }
    let ok = true;
    tab.filter(cartItem => {
        if (cartItem.id === action.movie.id) {
            cartItem.qte += 1
            ok = false;
        }
    })
    if (ok === true)
        tab.push(value)
    return updateObject( state, { cart: tab })
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