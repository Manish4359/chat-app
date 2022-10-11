import React, { useState } from "react";
import './contactsList.styles.scss'
import search from './../../assets/search.svg'
import plus from './../../assets/plus.svg'
import threedots from './../../assets/three-dots.svg'


import Contact from "../contact/contact.components";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import { signOutUser } from "../../firebase/firebase";

function ContactsList({ currentUser, setCurrentUser }) {

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

    const [showUserMenu, toggleUserMenu] = useState(false)

    const handleLogout = (e) => {
        e.stopPropagation()
        signOutUser()
        setCurrentUser(null)


    }
    const handleToogleUserMenu = (e) => {

        e.stopPropagation()
        toggleUserMenu(!showUserMenu)
    }

    return (
        <div className="contact-list">
            <div className="user-header">

                <img src={currentUser.photoURL} alt="" className="contact-user-img" />
                <h3 className="user-name">
                    {currentUser.name}
                </h3>
                <img alt="add" src={plus} className="add-btn" />
                <img alt="search" src={search} className="search-btn" />
                <div className="user-setting-menu" >
                    <div className="menu-btn" onClick={handleToogleUserMenu}>
                        <img alt='more' src={threedots} className="more-btn user-setting" />
                    </div>
                    {showUserMenu ? (<ul className="menu">
                        <li>starred messages</li>
                        <li >settings</li>
                        <li onClick={handleLogout}>logout</li>
                    </ul>) : <></>}
                </div>
            </div>
            <div className="contacts" >

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

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: () => dispatch(setCurrentUser(null))
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList); 