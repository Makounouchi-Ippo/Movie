import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    cart: JSON.parse(localStorage.getItem('Panier')) || [],
    total: JSON.parse(localStorage.getItem('total')),
    qte: JSON.parse(localStorage.getItem('qte'))
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
    
    let temps = JSON.stringify(tempCart)
    localStorage.setItem('Panier',temps)
    return { ...state, cart: tempCart }
}

const removeToCart = (state, action) => {

    let obj = state.cart.filter((cartItem) => cartItem.id !== action.id)

    let temps = JSON.stringify(obj)
    localStorage.setItem('Panier',temps)
    return updateObject( state, { 
        cart: obj
    })
}

const resetCart = (state ) => {
    let obj = []
    let temps = JSON.stringify(obj)
    localStorage.setItem('Panier',temps)
    return updateObject( state, { 
      cart: obj,
      
    })
}

const increase = (state, action) => {
    let tempCart = state.cart.map(cartItem => {
        if (cartItem.id === action.id)
            cartItem = { ...cartItem, qte: cartItem.qte + 1 };
        return cartItem;
    })
    let temps = JSON.stringify(tempCart)
    localStorage.setItem('Panier',temps)
    return { ...state, cart: tempCart }
}

const decrease = (state, action) => {
    let tempCart = state.cart.map(cartItem => {
        if (cartItem.id === action.id)
            cartItem = { ...cartItem, qte: cartItem.qte - 1 };
        return cartItem;
    })
    let temps = JSON.stringify(tempCart)
    localStorage.setItem('Panier',temps)
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
    let temps = JSON.stringify(total)
    localStorage.setItem('total',temps)
    let temps1 = JSON.stringify(qte)
    localStorage.setItem('qte',temps1)
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