import React from "react";
import './contactsContainer.styles.scss'
import ContactsList from "../contactsList/contactsList.component";
import MessageList from "../messageList/messageList.component";

function ContactsContainer(){

    return <div className="contact-container">
<ContactsList />
<MessageList  />
    </div>
}

export default ContactsContainer;