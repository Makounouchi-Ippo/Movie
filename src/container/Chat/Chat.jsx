import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import * as actions from '../../store/actions/index';
// import {Modal} from 'react-bootstrap'
import './Chat.css';
import AOS from 'aos'
// import { Widget } from 'react-chat-widget';
import io from 'socket.io-client'
import {AiFillWechat} from 'react-icons/ai'


const Chat = () => {

    const [name,setName] = useState('')
    const [room,setRoom] = useState('')

    useEffect (()=>{
        AOS.init()
        //instauration de la connexion
        // const socket = io("http://localhost:3000")
        // socket.emit('join',{name:localStorage.getItem('name')},()=>{

        // })
        // console.log(socket)
        // return () => {
        //         socket.emit('disconnect')
        //         socket.off();
        // }
        //     // else if (localStorage.getItem('leaveCommunity')){
        //     //     socket.emit('LeaveCommunity')
        //     //     socket.off();
        //     // }
            
       //}
    },[])

    useEffect (()=> {})

    let chat;
    if (localStorage.hasOwnProperty('toolbar')){
        chat = ( <div data-aos="zoom-in" data-aos-duration='2000' style={{backgroundColor:'gold', borderRadius:'50%', height:'80px', width:'80px',cursor:'pointer'}}>
        <AiFillWechat style={{height:'70px', width:'70px', margin:'5px 0px 0px 5px'}}/>
         </div>)
    }

    return(
    <>
       {chat}
    </>
    )

}



export default Chat;