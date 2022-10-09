import React from "react";
import './contactsList.styles.scss'
import search from './../../assets/search.svg'
import plus from './../../assets/plus.svg'
import bell from './../../assets/bell.svg'

import Contact from "../contact/contact.components";
import { connect } from "react-redux";

function ContactsList({currentUser}) {

    const contacts = [
        {
            1: {
                name: 'manish',
                messages: [
                    {
                        sender: "vivek",
                        message: "hello there",
                        time: '10:48'
                    }
                ]
            }

        },
        {
            2: {
                name: 'vivek',
                messages: [
                    {
                        sender: "vivek",
                        message: "hello there",
                        time: '10:48'
                    }
                ]
            }
            
        },
        {
            3: {
                name: 'pk',
                messages: [
                    {
                        sender: "vivek",
                        message: "hello there",
                        time: '10:48'
                    }
                ]
            }
            
        }
    ]
    return (
        <div className="contact-list">
            <div className="user-header">

                <img src={currentUser.photoURL} alt="" className="contact-user-img" />
                <h3 className="user-name">
                    {currentUser.name}
                </h3>
                <img alt="add" src={plus} className="add-btn" />
                <img alt='notif' src={bell} className="bell-btn" />
                <img alt="search" src={search} className="search-btn" />
            </div>
            <div className="contacts">

                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
            

            </div>
        </div>
    )

}

const mapStateToProps=state=>({
    currentUser:state.user.currentUser
})

export default  connect(mapStateToProps)(ContactsList); 