import React, { Component } from 'react'
import Toolbar from './Toolbar/Toolbar'
import BackDrop from './Backdrop/Backdrop'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Chat from '../Chat/Chat'

class Layout extends Component {
    state={
        open: false,
        chat: true
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
                    <footer style={{width:'80px',height:'80px',position:'fixed',bottom:'50px',right:'0',marginRight:'50px'}}>   
                        <Chat/>
                    </footer> 
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
  