import React, { Fragment, useEffect, useState } from "react";
import './messageList.styles.scss'
import search from './../../assets/search.svg'
import threedots from './../../assets/three-dots.svg'
import call from './../../assets/call-add.svg'
import smile from './../../assets/smile.svg'
import send from './../../assets/send.svg'

function MessageList() {

    let [text, setText] = useState("")

    const handleInputText=(e)=>{
        setText(e.target.value)
        console.log(e)

        
        if(e.key==='Enter'){
            sendMessage()
        }
    }

    const sendMessage = (e) => {

        document.querySelector('.input-msg').value=""
        if (text) {
            const container=document.querySelector('.messages')
            console.log(container.scrollHeight)
            container.insertAdjacentHTML("afterbegin", `<span class="message user-message">${text}</span>`);
            container.scrollTop=container.scrollHeight
            text=""
        }


    }


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
            <div className="messages " >
                <span className="message user-message">mesNote that the development build is
                    not optimized.
                    To create a production build, use npm run build.sages1 </span>
                <span className="message contact-message">messNote that the development build is not optimized.
                    To create a production build, use npm run build.ages3 </span>
                <span className="message user-message">messNote that the development build is not optimized.
                    To create a production build, use npm run build.ages2 </span>
                <span className="message user-message">messNote that the development build is not optimized.
                    To create a production build, use npm run build.ages2 </span>
                <span className="message contact-message">messNote that the development build is not optimized.
                    To create a production build, use npm run build.ages2 </span>
                <span className="message user-message">messNote that the development build is not optimized.
                    To create a production build, use npm run build.ages2 </span>
                <span className="message user-message">messNote that the development build is not optimized.
                    To create a production build, use npm run build.ages2 </span>
                <span className="message user-message">messNote that the development build is not optimized.
                    To create a production build, use npm run build.ages2 </span>
                <span className="message contact-message">messNote that the development build is not optimized.
                    To create a production build, use npm run build.ages2 </span>
                <span className="message user-message">messNote that the development build is not optimized.
                    To create a production build, use npm run build.ages2 </span>
                <span className="message contact-message">messNote that the development build is not optimized.
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
                    <img src={send} alt="send" onClick={sendMessage} />
                </div>
            </div>
        </div>)
}

export default MessageList