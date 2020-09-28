import React, { Component } from 'react'
import Toolbar from './Toolbar/Toolbar'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Chat from '../Chat/Chat'

class Layout extends Component {
    state= {
        open: false
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
               { show && <footer style={{width:'80px',height:'80px',position:'fixed',bottom:'50px',right:'0',marginRight:'50px'}}>   
                    <Chat/>
                    </footer>} 
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
      toolbar: state.auth.toolbar
    };
  };
  
  
  export default withRouter(connect(mapStateToProps) (Layout)); 
  