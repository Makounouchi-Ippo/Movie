import React, { Component } from 'react';
import classes from './Home.css'
import 'react-notifications/lib/notifications.css';
import 'react-toastify/dist/ReactToastify.css';
import Carousel from './Carrousel/Carrousel'
import Button from './ButtonSelect/ButtonSelect'
import ListMovies from './ListMovies/ListMovies'
import {
    CSSTransition,
    SwitchTransition, TransitionGroup, CSSTransitionGroup
  } from 'react-transition-group';
import test from "../../assets/images/Affiche_non_disponible.png"
import {Toast,} from 'react-bootstrap';
import './Home.css'


class Home extends Component {
    state ={
        user: {},
        show:true,
        mountToast: true,
        inProp: false
    }



componentDidMount () {    
    var user = {}, 
    keys = Object.keys(localStorage),
    i = keys.length;

    while ( i-- ) {
        user[ keys[i] ] = localStorage.getItem( keys[i] );
}
    this.setState({user})
  
  
}


    setShow = () =>{
        this.setState({show:false})
  
    }

    render () {
    
        let alert;
     

        // let Transition;

        // Transition = ( <CSSTransition in={this.state.inProp} timeout={200} classNames="my-node">
        //    <div>
        //    <img src={test} alt="images"></img>
        //    </div>
        //     </CSSTransition> )




        if (this.state.user.name && this.state.user.photo && localStorage.getItem('show') ){
           alert= (
                <Toast onClose={() => this.setShow(false)}  style={{position:'absolute',top:'10',right:'0',zIndex:'600'}} show={this.state.show} delay={5000} autohide>
                    <Toast.Header>
                        <img style={{width:'50px', height:'45px',borderRadius:'100px'}} src={this.state.user.photo} className="rounded mr-2" alt="" />
                        <strong className="mr-auto"> Team Netflix</strong>
                    </Toast.Header>
                    <Toast.Body>Hello, {this.state.user.name}, have fun;)</Toast.Body>
                 </Toast>
           )
    
        }
        else if (localStorage.getItem('show'))
        { 
                alert= (
                    <Toast onClose={() => this.setShow(false)}  style={{position:'absolute',top:'10',right:'0',zIndex:'600'}} show={this.state.show} delay={5000} autohide>
                        <Toast.Header>
                            <img style={{width:'100px', height:'60px'}} src='https://img.over-blog-kiwi.com/2/71/08/42/20190322/ob_3e6dd6_f4f45f93-efae-4acd-a7c7-0fefe62c85dd.png' className="rounded mr-2" alt="" />
                            <strong className="mr-auto"> Team Netflix</strong>
                        </Toast.Header>
                        <Toast.Body>Hello, jeune netflixeur, have fun;)</Toast.Body>
                    </Toast>
                )
        }
    

        return (
            <div className={classes.page}>
                {alert} 
                {/* //{Transition} */}
                <Carousel/> 
                <Button/>
                <ListMovies />
            </div>
        )
    }
}
  
export default Home; 