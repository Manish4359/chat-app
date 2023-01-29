import React, { useEffect, useState } from "react";
import { signOutUser, addData } from "../../firebase/firebase";
import './chatList.styles.scss'

import ChatCard from "../chatCard/chatCard.components";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import { createRoom, roomCreated } from './../../redux/chatRoom/chatRoom.actions'
import AddContact from "../addContact/addContact.component";
import searchIcon from './../../assets/icons/search.png';
import moreIcon from './../../assets/icons/more.png';
import addUserIcon from './../../assets/icons/add-user.png';
import { getMessage } from "../../firebase/firebase";



function ChatList({ chatRoom, currentUser, setCurrentUser, createRoom, roomCreated }) {



    const [showUserMenu, toggleUserMenu] = useState(false)
    const [showContactList, toggleShowContactList] = useState(false)

    const handleLogout = (e) => {

        e.stopPropagation()
        signOutUser()
        setCurrentUser(null)

    }
    const handleToogleUserMenu = (e) => {

        e.stopPropagation()
        toggleUserMenu(!showUserMenu)
    }

    const selectContact = async contact => {
        console.log(contact)

        if (chatRoom.room?.receiverId === contact && chatRoom.room?.senderId === currentUser.id) {
            console.log("Already in the room");
            return
        }

        const members = {
            members: [currentUser.id, contact]
        }
        /*
                const response= await fetch('http://localhost:8888/chat/room',{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body:JSON.stringify(members)
                }).then(res=>res.json());
        */

        const roomData = {
            roomId: Date.now(),
            senderId: currentUser.id,
            receiverId: contact
        }
        roomCreated(true)
        createRoom(roomData)
        await getMessage(currentUser.id,contact)

    }

    return (

        <div className="chat-list">
            <div className="user-header">

                <img src={currentUser.photoURL} alt="" className="contact-user-img" />
                <h3 className="user-name">
                    {currentUser.name}
                </h3>
                <div className="add-btn" onClick={() => toggleShowContactList(!showContactList)}>
                     <img src={addUserIcon}/>
                </div>

                <div className="search-btn">
                <img src={searchIcon}/>
                </div>

                <div className="user-setting-menu" >
                    <div className="menu-btn" onClick={handleToogleUserMenu}>
                        <img className="more-btn user-setting" src={moreIcon}/> 
                    </div>
                    {showUserMenu ? (<ul className="menu">
                        <li>starred messages</li>
                        <li >settings</li>
                        <li onClick={handleLogout}>logout</li>
                    </ul>) : <></>}
                </div>
            </div>
            {showContactList ?
                <AddContact toggleShowContactList={toggleShowContactList} /> :
                <div className="chats" >
                    {console.log(currentUser.contacts)}
                    {currentUser.contacts ? currentUser.contacts.map((contact, id) => <ChatCard key={id} contact={contact} selectContact={selectContact} />) : <div>no contacts</div>}
                </div>}
        </div>

    )

}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    chatRoom: state.chatRoom
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: () => dispatch(setCurrentUser(null)),
    createRoom: (room) => dispatch(createRoom(room)),
    roomCreated: (state) => dispatch(roomCreated(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatList); 