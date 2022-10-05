import React from "react";
import './contact.styles.scss'

function Contact() {
    return (
        <div className="contact">
            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="" className="contact-user-img" />
            <div className="contact-det">
                <div>
                    <h3 className="user-name">
                        Saurav
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

export default Contact