import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios'
import Movie from './Movie/Movie';
import classes from './ListMovies.css'
//import { API_KEY, PATH_DISCOVER ,PATH_BASE, PATH_MOVIE, PATH_POPULAR ,PATH_SEARCH, PATH_PAGE, PATH_ADULT, PATH_LANGUE } from '../../../component/Utility/api'



class Movielist extends Component{

    state = {
        data: [],
        index: null
    }


    componentDidMount () {
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=1e32f5c452c2267d5367589e9864ab1c&language=en-US&page=1')
        .then(response => {
            this.setState({data:response.data.results},() => {
            
            }) 
        })
        .catch(err => {
            console.log(err.response)
        })
    }


    render() {
        
        let aff=null;
        if (this.props.movie){
            aff=this.props.movie.map((data,index) => (
            <Movie key={index} image={data.poster_path}  data={data.original_title}/>
        ))}
        if (this.state.data !== null && this.props.movie === null){
            aff=this.state.data.map((data,index) => (
            <Movie key={index} image={data.poster_path}  data={data.original_title}/>
        ))}

       

        return (
            <div className={classes.listmovie}>
                   {aff}
            </div>

        )

    }


}

const mapStateToProps = state => {
    return {
         movie: state.movie.movie
    };
  };
   

  
export default withRouter(connect(mapStateToProps) (Movielist));