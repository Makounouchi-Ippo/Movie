import React, { Component } from 'react'
import Toolbar from './Toolbar/Toolbar'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import axios from 'axios'
import Chat from '../Chat/Chat'
import AOS from 'aos'

class Layout extends Component {
    state= {
        open: false,
    }
    
    componentDidMount =()=>{
        AOS.init()
        if (!localStorage.getItem('chat')){
            axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/user.json/`)
            .then(response => {
                if (response.data.name){
                    this.props.showChat()
                    localStorage.SetItem('chat',true)
                }
                console.log('PSGGGG->>>>',response.data.name)})
            .catch(err => {}) 
        }
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
               { show && <footer style={{bottom:'10px',zIndex:'100'}}>   
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
const mapDispatchToProps = dispatch => {
    return {
     showChat: () => dispatch(actions.showChat())
    };
  };
  
  export default withRouter(connect(mapStateToProps,mapDispatchToProps) (Layout)); 
  