import React from "react";
import './chatCard.styles.scss'

function ChatCard({contact,fun}) {

   // console.log(name,email)
    return (
        <div className="chatCard" onClick={()=>fun(contact)}>
            <img src="https://xsgames.co/randomusers/avatar.php?g=male" alt="" className="chatCard-user-img" />
            <div className="chatCard-det">
                <div>
                    <h3 className="user-name">
                    </h3>
                    <span>12:45</span>
                </div>
                <div>
                    <span>hello there</span>
                    <div className="unseen-m">
                        <span>59</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatCard