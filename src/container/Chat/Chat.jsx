import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import * as actions from '../../store/actions/index';
// import {Modal} from 'react-bootstrap'
import './Chat.css';
import N from '../../assets/images/netflix-logo.png';
// import { Widget } from 'react-chat-widget';
import io from 'socket.io-client'
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';



const Chat = () => {

    //const [user,setUser] = useState(';kjvkfvlfkj')
    // const [name,setName] = useState('')
    // const [room,setRoom] = useState('')

    useEffect (()=>{
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

    // const userMessage = () => {
    //     setUser()
  
    //   };

  
    const handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
        
      };

    let chat;
    if (localStorage.hasOwnProperty('toolbar')){
        chat = ( <div >
        <Widget title="Netflix Chat"  subtitle={'Profiter'} handleNewUserMessage={handleNewUserMessage} senderPlaceHolder="ecrire un message" />
        
         </div>)
    }

    return(
    <>
       {chat}
    </>
    )

}



export default Chat;