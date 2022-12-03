import React, { useEffect, useLayoutEffect } from "react";
import { io } from "socket.io-client";

import { connect } from "react-redux";


import './chatContainer.styles.scss'
import ChatList from "../chatList/chatList.component";
import MessageList from "../messageList/messageList.component";
import { useState } from "react";

function ChatContainer({ currentUser }) {



    let [socket,setSock]=useState(null);

    const setSocketRef= async ()=>{
    
        const s =await io("ws://localhost:8888/")

        setSock(s)
    }
    useEffect(() => {
        setSocketRef()
    }, [])

    return (socket ? <div className="chat-container">
        <ChatList />
        <MessageList socket={socket}/>
    </div> : <span>connecting to server</span>)

}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(ChatContainer);
