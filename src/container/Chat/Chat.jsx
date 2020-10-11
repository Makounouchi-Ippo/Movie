import React, { useEffect} from 'react';
import './Chat.css';
import io from 'socket.io-client'
import { Widget,addResponseMessage} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
const socket = io("http://localhost:3008")

const Chat = () => {

    useEffect (()=>{
        socket.on('msg serveur:',msg=> {
            addResponseMessage(msg)
        })
        return () => {
            socket.off(addResponseMessage);
        };           
    },[])

    const handleNewUserMessage = (newMessage) => {
        socket.emit('msg envoyer :',localStorage.getItem('name') ,newMessage)
    };
      
    let chat;
    if (localStorage.hasOwnProperty('toolbar')){
        chat = ( 
        <div className="chat">
            <Widget className="rcw-widget-container" title="Tchat"  subtitle={'VIP'} handleNewUserMessage={handleNewUserMessage}  senderPlaceHolder="ecrire un message" />
        </div>)
    }

    return(
        <>
         {chat}
        </>
    )
}

export default Chat;