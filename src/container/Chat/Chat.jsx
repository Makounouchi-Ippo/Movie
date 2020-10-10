import React, { useEffect} from 'react';
import './Chat.css';
import io from 'socket.io-client'
import { Widget,addResponseMessage} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
const socket = io("http://localhost:3008")

const Chat = () => {


    useEffect (()=>{
        socket.on('msg serveur:',msg=> {
            console.log('taille',msg.length)
            console.log('msggg recu du serveur--->',msg) 
            console.log(socket)
            addResponseMessage(msg)
        })
               
    },[])

    const handleNewUserMessage = (newMessage) => {
        socket.emit('msg envoyer :',localStorage.getItem('name') ,newMessage)
        console.log(`New message incoming! ${newMessage}`);
      };
      
    let chat;
    if (localStorage.hasOwnProperty('toolbar')){
        chat = ( <div className="Chat">
        <Widget title="Tchat"  subtitle={'Discuter avec les membres de la communauté'} handleNewUserMessage={handleNewUserMessage}  senderPlaceHolder="ecrire un message" />
        
         </div>)
    }

    return(
    <>
       {chat}
    </>
    )

}



export default Chat;