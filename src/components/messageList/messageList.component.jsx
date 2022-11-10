import React, { Fragment, useEffect, useState } from "react";
import './messageList.styles.scss'
import search from './../../assets/search.svg'
import threedots from './../../assets/three-dots.svg'
import call from './../../assets/call-add.svg'
import smile from './../../assets/smile.svg'
import send from './../../assets/send.svg'
import { io } from "socket.io-client";

import { connect } from "react-redux";

function MessageList({chatRoom}) {

    let [text, setText] = useState("")

    const handleInputText = (e) => {
        setText(e.target.value)
        console.log(e)


        if (e.key === 'Enter') {
           // sendMessage()
        }
    }
 const {isRoomCreated}=chatRoom
    console.log(isRoomCreated)


    /*
    const sendMessage = (e) => {
        const container = document.querySelector('.messages')

        document.querySelector('.input-msg').value = ""
        if (text) {

            //   container.insertAdjacentHTML("beforeend", `<span class="message user-message">${text}</span>`);

            const msgData = {
                senderId: "8P4QEVjea5OdMz0xt6hfgsfb65A3",
                receiverId: "LgU0D80td0gn6bvzRPIlZZEGkYg2",
                msg: text
            }

            io().emit('message', msgData)
            io().on('message', ({ senderId, msg }) => {

                container.insertAdjacentHTML("beforeend", `<span class="message ${senderId === currentUser.id ? 'user-message' : 'contact-message'}">${msg}</span>`);
                container.scrollTop = container.scrollHeight
            })

            setText("")
        }
        
    }
    */


    return (
        <div className="message-list">
            {
                isRoomCreated ? <><div className="contact-header">

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
                    <div className="messages " >

                        <span className="chat-day">Yesterday</span>
                        <span className="message user-message">mesNote that the development build is
                            not optimized.
                            To create a production build, use npm run build.sages1 </span>

                        <span className="message contact-message">messNote that the development build is not optimized.
                            To create a production build, use npm run build.ages3 </span>
                        <span className="message user-message">messNote that the development build is not optimized.
                            To create a production build, use npm run build.ages2 </span>
                        <span className="chat-day">Today</span>
                        <span className="message user-message">messNote that the development build is not optimized.
                            To create a production build, use npm run build.ages2 </span>
                        <span className="message contact-message">messNote that the development build is not optimized.
                            To create a production build, use npm run build.ages2 </span>

                    </div>
                    <div className="message-send">
                        <div className="smile-btn">

                            <img src={smile} alt="smile" />
                        </div>
                        <input className="input-msg" type="text" placeholder="Type your message here..." onKeyUp={handleInputText} />
                        <div className="send-btn">
                            <img src={send} alt="send"  />
                        </div>
                    </div></> : <div>not room created</div>}
        </div>)
}

const mapStateToProps = state => {
    return {
        chatRoom: state.chatRoom
    }
}


export default connect(mapStateToProps)(MessageList)

