import React, { Fragment, useEffect, useRef, useState } from "react";

import './messageList.styles.scss'
import search from './../../assets/search.svg'
import threedots from './../../assets/three-dots.svg'
import call from './../../assets/call-add.svg'
import smile from './../../assets/smile.svg'
import send from './../../assets/send.svg'

import { connect } from "react-redux";

function MessageList({ chatRoom, currentUser, socket }) {


    let textRef = useRef("")

    const handleInputText = (e) => {
        // console.log(e)
        if (e.key === 'Enter') {
            sendMessage()
        }
    }
    const { isRoomCreated } = chatRoom
    const { room } = chatRoom

    // console.log(isRoomCreated,room)

    socket.on('connect', () => {
        console.log('connected', socket.id)
    })

    const sendMessage = (e) => {

        const container = document.querySelector('.messages')
        const text = textRef.current.value;

        document.querySelector('.input-msg').value = ""
        if (text) {

            //   container.insertAdjacentHTML("beforeend", `<span class="message user-message">${text}</span>`);

            const msgData = {
                id: Date.now(),
                senderId: room.senderId,
                receiverId: room.receiverId,
                message: text
            }
            container.insertAdjacentHTML("beforeend", `<span class="message user-message">${msgData.message}</span>`);

            console.log(msgData);

            socket.emit('send-mess', msgData)

            socket.onAny((event, ...args) => {
                console.log(event, args);
            });

            socket.off('receive-mess').on(`receive-mess`, ({id, senderId, receiverId, message }) => {


                console.log(msgData)
                if (receiverId !== currentUser.id || senderId !== room.receiverId) return

                container.insertAdjacentHTML("beforeend", `<span class="message ${senderId === currentUser.id ? 'user-message' : 'contact-message'}">${message}</span>`);
                container.scrollTop = container.scrollHeight

            })

            /*
            const socket = io("ws://localhost:8888/")
            socket.on('connect', () => {
                console.log('connected');


                io().emit('send-mess', msgData)
                io().on(`rec-mess-${msgData.receiverId}`, ({ senderId, receiverId, message }) => {

                    container.insertAdjacentHTML("beforeend", `<span class="message ${receiverId === currentUser.id ? 'user-message' : 'contact-message'}">${message}</span>`);
                    container.scrollTop = container.scrollHeight
                })

            })
            */
        }
        textRef.current.value = ""

    }



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

                        {/*
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
*/}
                    </div>
                    <div className="message-send">
                        <div className="smile-btn">

                            <img src={smile} alt="smile" />
                        </div>
                        <input className="input-msg" type="text" placeholder="Type your message here..." ref={textRef} onKeyUp={handleInputText} />
                        <div className="send-btn">
                            <img src={send} alt="send" onClick={sendMessage} />
                        </div>
                    </div></> : <div>no room created</div>}
        </div>)
}

const mapStateToProps = state => {
    return {
        chatRoom: state.chatRoom,
        currentUser: state.user.currentUser
    }
}


export default connect(mapStateToProps)(MessageList)

