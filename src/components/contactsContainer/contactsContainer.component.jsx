import React, { useLayoutEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { connect } from "react-redux";
import './contactsContainer.styles.scss'
import ContactsList from "../contactsList/contactsList.component";
import MessageList from "../messageList/messageList.component";

function ContactsContainer({ currentUser }) {


    return (
        <div className="contact-container">
            <ContactsList />
            <MessageList />
        </div>)
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(ContactsContainer);