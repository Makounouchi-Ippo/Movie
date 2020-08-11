import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    movie: [],
    loading: false,
    error: null,
    page: 1,
    hasmore: true,
    inputValue:'',
    selectedOption: {
      Genre: {value: null, label: 'Genre'}, 
      Years: {value: null , label: 'Years'},
      SortBy: {value: null, label: 'SortBy'}
  },
    searchBarNoResult:1,
    nameScrolling: '',
    setButton: false,
    movieDetail: []
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
        movie: action.movie,
        searchBarNoResult: action.data,
        nameScrolling: 'searchInput',
        inputValue:action.inputValue
     } );
  };

  const moviePopular = (state, action) => {
    let a = [...state.movie, ...action.movie];
  const tab = a.filter(movie => movie.poster_path !== null)
    return updateObject( state, {
        loading: false,
        movie: tab,
        nameScrolling: 'popular'
     } );
  };

  const movieFiltre = (state, action) => {
    let a = [...state.movie, ...action.movie];
    const tab = a.filter(movie => movie.poster_path !== null)
    return updateObject( state, {
        loading: false,
        movie: tab,
        selectedOption: action.filtreValue,
        nameScrolling: 'filtre'
     } );
  };

  const InfiniteScrollMovie = (state, action) => {
    let a = [...state.movie, ...action.movie];
    const tab = a.filter(movie => movie.poster_path !== null)
    return updateObject( state, {
      loading: false,
      movie: tab,
      page: state.page+1,
     } );
  };

  const clearMovie = (state, action) => {
    return updateObject( state, {
      movie: [],
      page:1
     } );
  };

  const pageInitial = (state, action) => {
    return updateObject( state, {
      page:1
     } );
  };

  const movieDetail = (state, action) => {
    return updateObject( state, {
      loading: false,
      movieDetail:action.movieDetail
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
        case actionTypes.INFINITE_SCROLL: return InfiniteScrollMovie(state,action);
        case actionTypes.CLEAR_MOVIE: return clearMovie(state,action);
        case actionTypes.PAGE_INITIAL: return pageInitial(state,action);
        case actionTypes.MOVIE_DETAIL: return movieDetail(state,action);
        default:
            return state;
    }
  };
  export default reducer;