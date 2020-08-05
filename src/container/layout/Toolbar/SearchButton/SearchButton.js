import React, {Component} from 'react'
import {Form,FormControl} from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index'



class SearchButton extends Component {

  inputValue = (e) => {
    if (e.target.value === ''){
      this.props.clearMovie();
      this.props.fetchData()
  }
    else {
      this.props.pageInitial()
      this.props.valueInput(e.target.value)
    }
      
}
  
  render(){
    return(
      <Form inline>
      <FormControl  type="text" placeholder="search Movies" className="mr-lg-8" onChange={this.inputValue}
       />

      </Form>
      )
  }
}
 

const mapDispatchToProps = dispatch => {
    return {
      valueInput: (value) => dispatch(actions.movieSearch(value)),
      fetchData: () => dispatch(actions.movieSearch('fetchDataPopular')),
      clearMovie: () => dispatch(actions.clearMovie()),
      pageInitial:() =>  dispatch(actions.pageInitial())
    };
  };
  

export default withRouter(connect(null, mapDispatchToProps) (SearchButton));
