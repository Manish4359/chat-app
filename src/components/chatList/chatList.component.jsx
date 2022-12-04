import React, { useEffect, useState } from "react";
import { signOutUser, addData } from "../../firebase/firebase";
import './chatList.styles.scss'

import { AiOutlineUserAdd } from 'react-icons/ai'
import { MdMoreVert } from 'react-icons/md'
import { BsSearch } from 'react-icons/bs'
import ChatCard from "../chatCard/chatCard.components";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import { createRoom, roomCreated } from './../../redux/chatRoom/chatRoom.actions'


function ChatList({ currentUser, setCurrentUser, createRoom, roomCreated }) {



    const [showUserMenu, toggleUserMenu] = useState(false)

    const handleLogout = (e) => {

        e.stopPropagation()
        signOutUser()
        setCurrentUser(null)

    }
    const handleToogleUserMenu = (e) => {

        e.stopPropagation()
        toggleUserMenu(!showUserMenu)
    }

    const fn = async () => {
        console.log(currentUser.id)
        await addData();
    }

    const contacts = currentUser.contacts;
    console.log(contacts)


    const selectContact = contact => {
        // console.log(contact)
        const roomData = {
            roomId: Date.now(),
            senderId: currentUser.id,
            receiverId: contact
        }
        roomCreated(true)
        createRoom(roomData)
    }

    return (
        <div className="chat-list">
            <div className="user-header">

                <img src={currentUser.photoURL} alt="" className="contact-user-img" />
                <h3 className="user-name">
                    {currentUser.name}
                </h3>
                <div className="add-btn">
                    <AiOutlineUserAdd />
                </div>
                <div className="search-btn">
                    <BsSearch />
                </div>
    
                <div className="user-setting-menu" >
                    <div className="menu-btn" onClick={handleToogleUserMenu}>
                        <div className="more-btn user-setting">
                            <MdMoreVert />
                        </div>
                    </div>
                    {showUserMenu ? (<ul className="menu">
                        <li>starred messages</li>
                        <li >settings</li>
                        <li onClick={handleLogout}>logout</li>
                    </ul>) : <></>}
                </div>
            </div>
            <div className="chats" >
                {contacts ? contacts.map((contact, id) => <ChatCard key={id} contactId={contact} selectContact={selectContact} />) : <></>}
            </div>
        </div>

    )

}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: () => dispatch(setCurrentUser(null)),
    createRoom: (room) => dispatch(createRoom(room)),
    roomCreated: (state) => dispatch(roomCreated(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatList); 