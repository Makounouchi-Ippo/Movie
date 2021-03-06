import React, { Component } from 'react'
import Toolbar from './Toolbar/Toolbar'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
//import Chat from '../Chat/Chat'
import AOS from 'aos'

class Layout extends Component {
    state= {
        open: false,
    }

    componentDidMount =()=>{
        AOS.init()
    }
    displaySidebar = () => (
        this.setState((prevstate) =>{
          return {open: !prevstate.open}
        })
    )

    render() {
        let show = (localStorage.hasOwnProperty('toolbar') || localStorage.hasOwnProperty('token')===false)
       
        return (
            <React.Fragment>
               { show && <Toolbar open={this.displaySidebar}/> } 
                <main>
                    {this.props.children}
                </main>
               { show && this.props.showChat && <footer style={{bottom:'10px',zIndex:'100'}}>   
                    {/* <Chat/> */}
                    </footer>} 
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        showChat: state.auth.tchat,
      toolbar: state.auth.toolbar
    };
  };

  export default withRouter(connect(mapStateToProps) (Layout)); 
  