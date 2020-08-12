import React, {Component} from 'react'
import {Form,FormControl} from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index'



class SearchButton extends Component {

  state={
    inputValuee:''
  }

  inputValue = (e) => {
    this.props.clearMovie();
    this.setState({inputValuee:e.target.value})
    if (e.target.value === ''){
      this.props.fetchData()
  }
    else {
      this.props.pageInitial()
      this.props.valueInput(e.target.value)
    }
      
}

componentDidUpdate(prevProps){
  if (this.props.selectedOption.Genre.value !== prevProps.selectedOption.Genre.value || this.props.selectedOption.Years.value !== prevProps.selectedOption.Years.value  || this.props.selectedOption.SortBy.value!== prevProps.selectedOption.SortBy.value) {
    this.setState({inputValuee:''})
  }
}

  
  render(){
    // console.log('genre',this.props.selectedOption.Genre.value)
    // console.log('years',this.props.selectedOption.Years.value)
    // console.log('sortby',this.props.selectedOption.SortBy.value)
    return(
      <Form inline>
      <FormControl  type="text" placeholder="search Movies" value={this.state.inputValuee} className="mr-lg-8" onChange={this.inputValue}
       />

      </Form>
      )
  }
}
 
const mapStateToProps = state => {
  return {
    selectedOption: state.movie.selectedOption,
    inputValue: state.movie.inputValue
  };
};


const mapDispatchToProps = dispatch => {
    return {
      valueInput: (value) => dispatch(actions.movieSearch(value)),
      fetchData: () => dispatch(actions.movieSearch('fetchDataPopular')),
      clearMovie: () => dispatch(actions.clearMovie()),
      pageInitial:() =>  dispatch(actions.pageInitial())
    };
  };
  

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (SearchButton));
