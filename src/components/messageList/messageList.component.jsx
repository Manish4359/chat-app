import React, { Fragment, useEffect, useRef, useState } from "react";

import './messageList.styles.scss'


import { connect } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import sendIcon from './../../assets/icons/send.png';
import happyIcon from './../../assets/icons/happy.jpg';
import searchIcon from './../../assets/icons/search.png';
import moreIcon from './../../assets/icons/more.png';
import { addMessage } from "../../firebase/firebase";



function MessageList({ chatRoom, currentUser, socket }) {



    let textRef = useRef("")
    let [showEmoji, setShowEmoji] = useState(false)


    const handleInputText = (e) => {
        // console.log(e)
        if (e.key === 'Enter') {
            sendMessage()
        }
    }
    const addEmoji = (e) => {
        textRef.current.value += e.emoji;
    }
    const { isRoomCreated } = chatRoom
    const { room } = chatRoom

    // console.log(isRoomCreated,room)
    /*
        socket.on('connect', () => {
            console.log('connected', socket.id)
        })
    */
    const sendMessage = async(e) => {

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
            
            console.log(msgData);
            container.insertAdjacentHTML("beforeend", `<span class="message user-message">${msgData.message}</span>`);
            container.scrollTop = container.scrollHeight
            await addMessage(msgData)
            /*
                        socket.emit('send-mess', msgData)
            
                        socket.onAny((event, ...args) => {
                            console.log(event, args);
                        });
            
                        socket.off('receive-mess').on(`receive-mess`, ({ id, senderId, receiverId, message }) => {
            
            
                            console.log(msgData)
                            if (receiverId !== currentUser.id || senderId !== room.receiverId) return
            
                            container.insertAdjacentHTML("beforeend", `<span class="message ${senderId === currentUser.id ? 'user-message' : 'contact-message'}">${message}</span>`);
                            container.scrollTop = container.scrollHeight
            
                        })
            */
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

    const addImage = () => {

    }

    const handleFile = async e => {
        console.log(e)
        let reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result)
            //console.log(text)
            // const base64 = e.target.result.replace(/.*base64,/, '');
            //    socket.emit('send-image', e.target.result);
            //alert(text)
        };
        //e.target.files?.forEach(file =>    reader.readAsDataURL(file))
        //console.log(e.target.files)
        reader.readAsDataURL(e.target.files[0])
        reader.onerror = function () {
            console.log(reader.error);
        };
    }
    /*
        socket.on('rec-image', img => {
            const image = new Image()
            image.src = `${img}`;
            console.log('rec-image')
            //console.log(image)
            document.querySelector('.messages')?.insertAdjacentHTML("beforeend", `<img class="img-message user-message" src='${img}'/>`);
    
        })
        */

    /*
    const fn=()=> {
        const contact = chatRoom.room.members.find((member) => member._id !== currentUser.id)
        console.log(contact)
        return contact.name
    }}
*/
    return (
        <div className="message-list">
            {
                isRoomCreated ? <>
                    <div className="contact-header">

                        <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="" className="contact-user-img" />
                        <div className="contact-user-data">
                            <h3 className="contact-name">

                            </h3>
                            <span className="contact-last-seen">
                                29 feb ,2022
                            </span>

                        </div>
                        <div className="search-btn">

                            <img src={searchIcon} alt="search" />
                        </div>
                        <div className="search-btn">

                            <img src={moreIcon} alt="more" />
                        </div>
                        {/*
                        <div className="search-btn"><BsSearch /></div>
                        <div className="call-btn"> <BiPhoneCall /></div>
                        <div className="more-btn"> <MdMoreVert /></div>
                         <img alt="search" src={search} className="search-btn" />
                        <img alt='call' src={call} className="more-btn" />
                            <img alt="more" src={threedots} className="call-btn " />
                        */}

                    </div>
                    <div className="messages " >

                        {/*
                    */}
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
                        <div className="message-send-content">

                            <div className="emoji-btn"
                                onClick={(e) => {
                                    setShowEmoji(!showEmoji);
                                    e.stopPropagation()
                                }}>

                                <img src={happyIcon} alt="happy" />

                            </div>
                            {/*
                        <div className="add-image" style={{ padding: '1rem' }} onClick={addImage}>
                        
                        <input type="file" multiple className="add-image-input" onChange={handleFile} />
                        <div className="add-image-icon">
                        <RiImageAddFill />

                            </div>
                        </div>
                        */}
                            {showEmoji ?
                                <div className="emoji-picker">
                                    <EmojiPicker autoFocusSearch={false} lazyLoadEmojis={true} previewConfig={{ showPreview: false }} onEmojiClick={addEmoji} />
                                </div> : <></>}
                            <input className="input-msg" type="text" placeholder="Type your message here..." ref={textRef} onKeyUp={handleInputText} />
                        </div>
                        <div className="send-btn" onClick={sendMessage}>
                            <img src={sendIcon} alt="send" />
                            {/* <IoMdSend style={{ color: 'white', width: '3.5rem', height: '3.5rem' }}/> */}
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

