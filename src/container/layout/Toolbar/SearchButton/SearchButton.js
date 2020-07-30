import React, {Component} from 'react'
import {Form,FormControl} from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index'



class SearchButton extends Component {

  inputValue = (e) => {
    e.target.value === '' ? this.props.fetchData():this.props.valueInput(e.target.value)
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
      fetchData: () => dispatch(actions.movieSearch('fetchDataPopular'))
    };
  };
  

export default withRouter(connect(null, mapDispatchToProps) (SearchButton));
