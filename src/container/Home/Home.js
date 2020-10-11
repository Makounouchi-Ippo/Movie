import React, { Component } from 'react';
import Carousel from './Carrousel/Carrousel'
import Button from './ButtonSelect/ButtonSelect'
import ListMovies from './ListMovies/ListMovies'
import {Toast} from 'react-bootstrap';
import {withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import './Home.css'

class Home extends Component {
    state ={
        user: {},
        show:true,
        netflix: false,
    }

    componentDidMount () { 
        localStorage.removeItem('commandeSuccess');
        var user = {}, 
        keys = Object.keys(localStorage),
        i = keys.length;
        while ( i-- ) {
            user[ keys[i] ] = localStorage.getItem( keys[i] );
        }
        this.setState({user})   
    }

    componentWillUnmount () {
        localStorage.removeItem('show')
    }
    setShow = () =>{
        this.setState({show:false})
    }

    render () {
        let alert;
        let displayComponent;
       
        if (this.state.user.name && this.state.user.photo && localStorage.getItem('show')){
           alert= (
                <Toast onClose={() => this.setShow()}  style={{position:'absolute',top:'10',right:'0',zIndex:'600',marginTop:'20px'}} show={this.state.show} delay={4000} autohide>
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
    if (localStorage.hasOwnProperty('animation') === true ){
        displayComponent = (
         <>   
        <audio src={process.env.PUBLIC_URL + '/netflix.mp3'} autoPlay/>
        <video className='video'  muted src={process.env.PUBLIC_URL + '/netflix.mp4'} autoPlay={true} type="video/mp4"/> </>) 
       setTimeout(() => {
        localStorage.removeItem('animation');
        this.setState({netflix:true}) 
        this.props.toolbar()
        }, 4000);  
    }   
   if ( localStorage.hasOwnProperty('animation') === false)
    {
        displayComponent = (
            <div>       
                {alert} 
                <Carousel/> 
                <Button/>
               <ListMovies />   
            </div>
        )
    }
    return (
            <div className='pageHome'>
               {displayComponent}
            </div>
    )
    }
}

const mapDispatchToProps = dispatch => {
    return {
      toolbar: () => dispatch(actions.toolbar())
    };
  };
  
export default withRouter(connect(null, mapDispatchToProps)(Home));