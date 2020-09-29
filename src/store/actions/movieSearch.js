import * as actionTypes from './actionTypes';
import axios from 'axios';
import { API_KEY, PATH_BASE, PATH_MOVIE, PATH_SEARCH, PATH_PAGE, PATH_ADULT, PATH_LANGUE } from '../../component/Utility/api'



export const movieBegin = () => {
    return {
        type: actionTypes.MOVIE_BEGIN
    };
};


export const movieSearchInput = (value,data,inputValue) => {
    return {
        type: actionTypes.MOVIE_SEARCH_INPUT,
        movie: value,
        data: data,
        inputValue: inputValue

    };
};

export const moviePopular = (value) => {
    return {
        type: actionTypes.MOVIE_POPULAR,
        movie: value
    };
};

export const InfiniteScrollMovie = (value, page) => {
    return {
        type: actionTypes.INFINITE_SCROLL,
        movie: value,
        page: page};
}

export const movieFiltre = (value,filtreValue,data) => {
    return {
        type: actionTypes.MOVIE_FILTRE,
        movie: value,
        data: data,
        filtreValue:filtreValue
    };
};

export const clearMovie = (error) => {
    return {
        type: actionTypes.CLEAR_MOVIE,
        error: error
    };
};

export const pageInitial = () => {
    return {
        type: actionTypes.PAGE_INITIAL,
    };
};


export const movieShowDetail = (data,youtubeKey) => {
    return {
        type: actionTypes.MOVIE_DETAIL,
        movieDetail: data,
        youtubeKey_release: youtubeKey
        
    };
};

export const movieFail = (error) => {
    return {
        type: actionTypes.MOVIE_FAIL,
        error: error
    };
};


export const reset = () => {
    return {
        type: actionTypes.RESET_MOVIE
    };
};


export const  movieSearch = (inputValue,idMovie) => {
    return dispatch => {
        dispatch(movieBegin());
            if (inputValue === "fetchDataPopular"){
                axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=1e32f5c452c2267d5367589e9864ab1c&language=fr&page=1&include_adult=false`)
                    .then(response => {
                        //console.log('serchBUttun',response.data)
                        dispatch(moviePopular(response.data.results))
                    })
                    .catch(err => {
                        dispatch(movieFail(err))
                       // console.log(err.response)
                    })
            }
            else if (inputValue === "showMovieDetail"){
                axios.get(`https://api.themoviedb.org/3/movie/${idMovie}?api_key=1e32f5c452c2267d5367589e9864ab1c&append_to_response=credits,videos,similar&language=fr&include_adult=false&vote_count.gte=200`)
                    .then(response => {
                        let date = { date: response.data.release_date.substr(0,4)}
                        let youtube 
                        if (response.data.videos.results.length !== 0)
                            youtube = {youtube: response.data.videos.results[0].key}
                        const returnedTarget = Object.assign(date, youtube);
                        dispatch(movieShowDetail(response.data,returnedTarget))
                    })
                    .catch(err => {
                        dispatch(movieFail(err))
                      //  console.log(err.response)
                    })
            }
            else {
                    axios.get(`${PATH_BASE}${PATH_SEARCH}${PATH_MOVIE}${API_KEY}${PATH_PAGE}1${PATH_LANGUE}fr${PATH_ADULT}"&query=${inputValue}&vote_count.gte=200`)
                    .then(response => {
                       // console.log('MovieSearchInput',response)
    
                        dispatch(movieSearchInput(response.data.results,response.data.total_results,inputValue))
                    })
                    .catch(err => {
                        //console.log('eeeeee')
                        dispatch(movieFail(err));
                })
            }
                
        }
        
};

export const movieFiltres = (filtreValue) => {
    //conso le.log(filtreValue)
    let fetchApi=`https://api.themoviedb.org/3/discover/movie?api_key=1e32f5c452c2267d5367589e9864ab1c&language=fr&include_adult=false&vote_count.gte=200`

    if (filtreValue.Genre.value) {fetchApi = fetchApi +`&with_genres=${filtreValue.Genre.value}`}
    if  (filtreValue.SortBy.value) {fetchApi = fetchApi +`&sort_by=${filtreValue.SortBy.value}`}
    if (filtreValue.Years.value) {fetchApi = fetchApi +`&primary_release_year=${filtreValue.Years.value}`}

    return dispatch => {
        dispatch(movieBegin());
         axios.get(fetchApi)
                    .then(response => {
                        console.log('resposneFILTREEE', response)
                        dispatch(movieFiltre(response.data.results,filtreValue,response.data.total_results))
                    })
                    .catch(err => {
                        dispatch(movieFail(err))
                        console.log('111',err.response)
                    })
        }      
}

export const InfiniteScroll = (nameScrolling,index,valueInput,filtreValue) => {
    //   console.log('filtreValue===>',filtreValue)
     //console.log('iindex',index)
    // console.log('value',valueInput)
    // console.log('nameScrolling',nameScrolling);

    let fetchApi=`https://api.themoviedb.org/3/discover/movie?api_key=1e32f5c452c2267d5367589e9864ab1c&language=fr&page=${index}&include_adult=false&vote_count.gte=200`

    if (filtreValue.Genre.value) {fetchApi = fetchApi +`&with_genres=${filtreValue.Genre.value}`}
   if  (filtreValue.SortBy.value) {fetchApi = fetchApi +`&sort_by=${filtreValue.SortBy.value}`}
   if (filtreValue.Years.value) {fetchApi = fetchApi +`&primary_release_year=${filtreValue.Years.value}`}


    return dispatch => {
        dispatch(movieBegin());
        switch(nameScrolling){

            case 'popular': axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=1e32f5c452c2267d5367589e9864ab1c&language=fr&page=${index}&include_adult=false`)
                .then(response => {
                    // console.log('page ====',index)
                    // console.log('reponse page',response)
                    dispatch(InfiniteScrollMovie(response.data.results, index ))
                })
                .catch(err => {
                    dispatch(movieFail(err))
                    //console.log(err.response)
                })
                break;

            case 'searchInput': axios.get(`${PATH_BASE}${PATH_SEARCH}${PATH_MOVIE}${API_KEY}${PATH_PAGE}${index}${PATH_LANGUE}fr${PATH_ADULT}"&query=${valueInput}&include_adult=false&vote_count.gte=200`)
                .then(response => {
                    // console.log('page ====',index)
                    // console.log('reponse page',response)
                    dispatch(InfiniteScrollMovie(response.data.results, index ))
                })
                .catch(err => {
                    // console.log('eeeeee')
                    dispatch(movieFail(err));
                 })
                 break;

            case 'filtre':  
                axios.get(fetchApi)
                    .then(response => {
                        // console.log('pageeee === ',index)
                        // console.log('resposne', response)
                        dispatch(InfiniteScrollMovie(response.data.results,index))
                    })
                    .catch(err => {
                        dispatch(movieFail(err))
                        //console.log(err.response)
                    })
                    break;
                

            default:
               //  console.log("Type de recherche Inconnuuuuuuu");
        } 
    }    
};