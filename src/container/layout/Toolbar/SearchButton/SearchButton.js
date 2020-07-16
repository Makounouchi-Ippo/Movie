import React, {Component} from 'react'
import {Form,FormControl,Button} from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index'


class SearchButton extends Component {

    state={
      input:null
    }

    inputValue = (e) => {
      this.setState({input:e.target.value})
    }

    buttonSearch = (e) => {
      e.preventDefault();
      this.props.valueInput(this.state.input)
    }
    
    render(){
      return(
        <Form inline>
          <FormControl type="text" placeholder="Movies" className="mr-lg-8" onChange={this.inputValue} />
          <Button variant="outline-danger" onClick={this.buttonSearch}>Search</Button>
        </Form>
        )
    }
}
 

const mapDispatchToProps = dispatch => {
    return {
      valueInput: (value) => dispatch(actions.movieSearch(value)) 
    };
  };
  

export default withRouter(connect(null, mapDispatchToProps) (SearchButton));
