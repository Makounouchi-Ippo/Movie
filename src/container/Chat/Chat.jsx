import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import * as actions from '../../store/actions/index';
// import {Modal} from 'react-bootstrap'
import './Chat.css';
import io from 'socket.io-client'
import {AiFillWechat} from 'react-icons/ai'


const Chat = () => {


    useEffect (()=>{
        //instauration de la connexion
        const socket = io("http://localhost:3000")
        socket.emit('join',{name:localStorage.getItem('name')},()=>{

        })
        console.log(socket)
        return () => {
            if (localStorage.getItem('token')=== null){
                socket.emit('disconnect')
                socket.off();
            }
            else if (localStorage.getItem('leaveCommunity')){
                socket.emit('LeaveCommunity')
                socket.off();
            }
            
        }
    },[])

    return(
        <div style={{backgroundColor:'gold', borderRadius:'50%', height:'80px', width:'80px'}}>
            <AiFillWechat style={{height:'70px', width:'70px', margin:'5px 0px 0px 5px'}}/>
        </div>
    )

}


export default Chat;