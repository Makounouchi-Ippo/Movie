import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import * as actions from '../../store/actions/index';
// import {Modal} from 'react-bootstrap'
import './Chat.css';
import N from '../../assets/images/netflix-logo.png';
// import { Widget } from 'react-chat-widget';
import io from 'socket.io-client'
import {useDispatch, useSelector} from 'react-redux';
import { Widget,addResponseMessage} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
const socket = io("http://localhost:3000")

const Chat = () => {

    const chats = useSelector(state => state.auth.chat)
    console.log('WHATTTTTT----->',chats)
    useEffect (()=>{
        socket.on('msg serveur:',msg=> {
            console.log('msggg recu du serveur--->',msg) 
            console.log(socket)
            addResponseMessage(msg)
        })
               
    })

    const handleNewUserMessage = (newMessage) => {
        socket.emit('msg envoyer :',localStorage.getItem('name') ,newMessage)
        console.log(`New message incoming! ${newMessage}`);
      };
      
    let chat;
    if (localStorage.hasOwnProperty('toolbar')){
        chat = ( <div className="Chat">
        <Widget title="Netflix Chat"  subtitle={'Profiter'} handleNewUserMessage={handleNewUserMessage}  senderPlaceHolder="ecrire un message" />
        
         </div>)
    }

    return(
    <>
       {chats && chat}
    </>
    )

}



export default Chat;