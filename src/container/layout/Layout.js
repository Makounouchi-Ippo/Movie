import React, { Component } from 'react'
import Toolbar from './Toolbar/Toolbar'
import BackDrop from './Backdrop/Backdrop'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

class Layout extends Component {
    state={
        open: false
    }

    displaySidebar = () => (
        this.setState((prevstate) =>{
          return {open: !prevstate.open}
        })
    )

    backDropClick = () => (
        this.setState({open: false})
    )

    render() {

        let backdrop = null

        if (!this.props.token){
            backdrop = <BackDrop/>
        }
        return (
            <React.Fragment>
                <Toolbar open={this.displaySidebar}/>
                    <div>
                        {backdrop}
                    </div>
                    <main>
                        {this.props.children}
                    </main>
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
      token: state.auth.token
    };
  };
  
  
  export default withRouter(connect(mapStateToProps) (Layout)); 
  