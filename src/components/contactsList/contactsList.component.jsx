import React from "react";
import './contactsList.styles.scss'
import search from './../../assets/search.svg'
import plus from './../../assets/plus.svg'
import bell from './../../assets/bell.svg'

function ContactsList() {
    return (
        <div className="contact-list">
            <div className="user-header">

                <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="" className="contact-user-img" />
                <h3 className="user-name">
                    Manish Kumar
                </h3>
                <img alt="add" src={plus} className="add-btn" />
                <img alt='notif' src={bell} className="bell-btn" />
                <img alt="search" src={search} className="search-btn" />
            </div>
            <div className="contacts">

                <div className="contact">
                    <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="" className="contact-user-img" />
                    <h3 className="user-name">
                        Saurav
                    </h3>
                    <span>12:45</span>
                </div>
                <div className="contact">
                    <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="" className="contact-user-img" />
                    <h3 className="user-name">
                        shubham Kumar
                    </h3>
                    <span>10:04</span>
                </div>
                <div className="contact">
                    <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="" className="contact-user-img" />
                    <h3 className="user-name">
                        sivam 
                    </h3>
                    <span>1:45</span>
                </div>

            </div>
        </div>
    )

}

export default ContactsList; 