import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from './../../redux/user/user.actions'
import { signinUser, signInWithGoogle } from "../../firebase/firebase";
import LoadingIndicator from "../loadingIndicator/loadingIndicator";
import googleLogo from './../../assets/google-logo.svg'

import './signIn.styles.scss'
function SignIn({ setCurrentUser }) {

    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showLoader, setShowLoader] = useState(false)
    const [showErrorText, setErrorText] = useState(false)
    const inputHandler = (e) => {

        if (e.target.name === 'email') {
            setEmail(e.target.value)
        }
        if (e.target.name === "password") {
            setPassword(e.target.value);
        }

        console.log(email, password)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setShowLoader(true)
        const user = await signinUser({ email, password })

        if (user) {
            setCurrentUser(user)
            setShowLoader(false)
            navigate('/')
        }
        else {

            setErrorText(true)
        }
        setShowLoader(false)
    }
    const handleSignInWithGoogle =async (e) => {
        e.preventDefault()

        const user=await signInWithGoogle();

        if(user){
            setCurrentUser(user)
            navigate('/')

        }

    }

    return (
        <div className="sign-in-container">
            <div className="sign-in">

                <h2>Welcome back</h2>
                <h3>welcome back! please enter your details</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="signin-email">Email</label><br />
                    <input type="email" id="signin-email" placeholder="Enter your email" name="email" onChange={inputHandler} /><br />
                    <label htmlFor="signin-pass">Password</label><br />
                    <input type="password" id="signin-pass" placeholder="Enter your password" name="password" onChange={inputHandler} />
                    <div className="signin-opt">
                        <div className="remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <span className="forgot-pass">Forgot password</span>
                    </div>
                    <p className="sign-in-error-text" style={{ display: showErrorText ? 'block' : 'none' }}>wrong email or password</p>
                    <button type="submit">
                        <div>
                            <span>Sign In</span>
                            <LoadingIndicator showLoader={showLoader} />
                        </div>
                    </button>
                </form>
                <button className="sign-in-with-google" onClick={handleSignInWithGoogle}><img src={googleLogo}/> Sign in with google</button>
                <span className="no-account">Don't have an account?<Link to='/signup'> Sign Up</Link> </span>
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


export default connect(mapStateToProps, mapDispatchToProps)(SignIn)