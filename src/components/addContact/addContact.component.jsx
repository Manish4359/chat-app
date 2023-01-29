import { async } from '@firebase/util';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

import { connect } from 'react-redux';
import LoadingIndicator from '../loadingIndicator/loadingIndicator';
import './addContact.styles.scss';
import { addContacts, getAllUsers } from '../../firebase/firebase';

function AddContact({ toggleShowContactList, currentUser }) {

    const [users, getUsers] = useState(null)

    useEffect(() => {
        getAllUsers(getUsers)
    }, [])
    /*
        const getAllUsers = async () => (
            await fetch('http://localhost:8888/chat/user')
                .then(res => res.json())
                .then(res => getUsers(res.data))
        )
        */

    const handleAddContact = async (contactId) => {
        /*
                await fetch(`http://localhost:8888/chat/user/${currentUser.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({ contacts: contactId })
                }).then(res => console.log(res.json()))
                */
        await addContacts(currentUser.id, contactId)
        console.log("added!!")

    }

    return (
        users ? <>
            <div className='contact-list'>
                Add Contact

                {Object.values(users).map(user => currentUser.id !== user.id ? <div key={user.id} className='contact'>
                    <img src="https://randomuser.me/api/portraits/men/70.jpg" alt="" className="contact-user-img" />
                    <div className='contact-name'>
                        <p> {user.name}</p>
                        <span>@{user.username}</span>
                    </div>
                    <button onClick={() => handleAddContact(user.id)}>add</button>
                </div>
                    : <></>)}
            </div>
        </> :
            <h1>loading...</h1>

    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(AddContact)