import React from "react";
import { connect } from "react-redux";
import './chatCard.styles.scss'

function ChatCard({ room, contactId, selectContact }) {



    const handleHover=(e,color)=>{
        if (room.receiverId === contactId) return
        e.currentTarget.style.backgroundColor = color
    }
    return (
        <div className="chatCard" onMouseEnter={(e) => handleHover(e,'#dedede')} onMouseLeave={(e)=>handleHover(e,'white')} style={{ backgroundColor: room?.receiverId === contactId ? '#00D1A0' : 'white' }} onClick={() => selectContact(contactId)}>
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

const mapStateToProps = (state) => ({
    room: state.chatRoom.room
})

export default connect(mapStateToProps)(ChatCard)