import React from "react";
import './messageList.styles.scss'
import search from './../../assets/search.svg'
import threedots from './../../assets/three-dots.svg'
import call from './../../assets/call-add.svg'
import smile from './../../assets/smile.svg'
import send from './../../assets/send.svg'

function MessageList() {
    return (
        <div className="message-list">
            <div className="contact-header">

                <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="" className="contact-user-img" />
                <div className="contact-user-data">
                    <h3 className="contact-name">
                        Tej punj
                    </h3>
                    <span className="contact-last-seen">
                        29 feb ,2020
                    </span>

                </div>
                <img alt="search" src={search} className="search-btn" />

                <img alt='call' src={call} className="more-btn" />
                <img alt="more" src={threedots} className="call-btn " />

            </div>
            <div className="messages">
                messages
            </div>
            <div className="message-send">
                <div className="smile-btn">

                <img src={smile} alt="smile"/>
                </div>
                <input type="text" placeholder="Type your message here..." />
                <div className="send-btn">
                    <img src={send} alt="send"/>
                </div>
            </div>
        </div>)
}

export default MessageList; 