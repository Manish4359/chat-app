import React, { useEffect, useLayoutEffect } from "react";
import { io } from "socket.io-client";

import { connect } from "react-redux";


import './chatContainer.styles.scss'
import ChatList from "../chatList/chatList.component";
import MessageList from "../messageList/messageList.component";

function ChatContainer({ currentUser }) {
/*
    
    useEffect(
        () => {
            const socket = io("ws://localhost:8888/")
            socket.on('connect', () => {
                console.log('connected');
            })
        }, [])
        
*/
    return (
        <div className="chat-container">
            <ChatList />
            <MessageList currentUser={currentUser} />
        </div>)
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(ChatContainer);
