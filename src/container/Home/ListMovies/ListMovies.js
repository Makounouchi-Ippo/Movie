import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Movie from './Movie/Movie';
import classes from './ListMovies.css'
import * as actions from '../../../store/actions/index'
import Spinner from '../../../component/UI/Spinner/Spinner'
class Movielist extends Component{

    componentDidMount () {
      this.props.fetchData()
    }


    render() {
        return (
            <div className={classes.listmovie}>
                {
                  this.props.movie ? 
                  this.props.movie.map((data,index) => (
                      <Movie key={index} image={data.poster_path} data={data.original_title}/>
                  ))
                  :<Spinner text="Chargement des film populaire veuillez patientez !"/> }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
         movie: state.movie.movie
    };
  };
   
const mapDispatchToProps = dispatch => {
    return {
      fetchData: () => dispatch(actions.movieSearch("fetchData")) 
    };
  };
  
export default withRouter(connect(mapStateToProps,mapDispatchToProps) (Movielist));