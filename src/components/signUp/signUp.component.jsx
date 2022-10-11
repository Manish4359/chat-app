import React, { useState } from "react";
import { signupUser } from "../../firebase/firebase";
import { connect } from "react-redux";
import { setCurrentUser } from './../../redux/user/user.actions'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import './signUp.styles.scss'
import LoadingIndicator from "../loadingIndicator/loadingIndicator";

function SignUp({ currentUser, setCurrentUser }) {

    const navigate = useNavigate();


    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [showLoader, setShowLoader] = useState(false)


    const inputHandler = (e) => {

        if (e.target.name === 'firstname') {
            setFirstName(e.target.value)
        }

        if (e.target.name === 'lastname') {
            setLastName(e.target.value)
        }

        if (e.target.name === 'email') {
            setEmail(e.target.value)
        }
        if (e.target.name === "password") {
            setPassword(e.target.value);
        }
        if (e.target.name === 'pass-confirm') {
            setConfirmPassword(e.target.value)
        }

        // console.log(firstName, lastName, email, password, confirmPassword)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setShowLoader(true)

        if (firstName === "" || lastName === "" || password !== confirmPassword) {
            alert('invalid credentials!!!')
            
            setShowLoader(false)
            return
        }

        const user = await signupUser({
            name: `${firstName} ${lastName}`,
            email,
            password,
            photoURL: `https://xsgames.co/randomusers/avatar.php?g=male`
        })
        console.log(user)
        if (user) {
            setCurrentUser(user);
            setShowLoader(false)
            navigate('/')
        }
        else {
            setShowLoader(false)
        }
    }


    return (
        <div className="sign-up-container">
            <div className="sign-up">

                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="name">
                        <div className="first-name">
                            <label htmlFor="fname">First name</label>
                            <input type="text" id="fname" name="firstname" placeholder="First name" onChange={inputHandler} />
                        </div>
                        <div className="last-name">
                            <label htmlFor="lname">Last name</label>
                            <input type="text" id="lname" name="lastname" placeholder="Last name" onChange={inputHandler} />
                        </div>
                    </div>
                    <label htmlFor="signup-email">Email</label><br />
                    <input type="email" id="signup-email" name="email" placeholder="Enter your email" onChange={inputHandler} /><br />
                    <label htmlFor="signup-pass">Password</label><br />
                    <input type="password" id="signup-pass" name="password" placeholder="Enter your password" onChange={inputHandler} /><br />
                    <label htmlFor="signup-pass-confirm">Confirm Password</label><br />
                    <input type="password" id="signup-pass-confirm" name="pass-confirm" placeholder="Re-enter your password" onChange={inputHandler} />
                    <div className="signup-opt">
                        <div className="remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <span className="forgot-pass">Forgot password</span>
                    </div>
                    <button type="submit">
                        <div>
                            <span>
                                Sign Up
                            </span>

                            <LoadingIndicator showLoader={showLoader} />
                        </div>
                    </button>
                </form>

                <span className="no-account">Already have an account?<Link to='/signin'> Sign In</Link> </span>

            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})


const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)