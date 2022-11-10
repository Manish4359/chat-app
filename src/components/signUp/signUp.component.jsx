import React, { useRef, useState } from "react";
import { signupUser } from "../../firebase/firebase";
import { connect } from "react-redux";
import { setCurrentUser } from './../../redux/user/user.actions'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import './signUp.styles.scss'
import LoadingIndicator from "../loadingIndicator/loadingIndicator";

function SignUp({ currentUser, setCurrentUser }) {

    const navigate = useNavigate();


    const firstNameRef = useRef("")
    const lastNameRef = useRef("")
    const emailRef = useRef("")
    const passwordRef = useRef("")
    const confirmPasswordRef = useRef("")
    const [showLoader, setShowLoader] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()

        setShowLoader(true)

        if (firstNameRef.current.value === "" || lastNameRef.current.value === "" || passwordRef.current.value !== confirmPasswordRef.current.value) {
            alert('invalid credentials!!!')

            setShowLoader(false)
            return
        }

        const user = await signupUser({
            name: `${firstNameRef.current.value} ${lastNameRef.current.value}`,
            email: emailRef.current.value,
            password: passwordRef.current.value,
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
                            <input type="text" id="fname" name="firstname" placeholder="First name" ref={firstNameRef} />
                        </div>
                        <div className="last-name">
                            <label htmlFor="lname">Last name</label>
                            <input type="text" id="lname" name="lastname" placeholder="Last name" ref={lastNameRef} />
                        </div>
                    </div>
                    <label htmlFor="signup-email">Email</label><br />
                    <input type="email" id="signup-email" name="email" placeholder="Enter your email" ref={emailRef} /><br />
                    <label htmlFor="signup-pass">Password</label><br />
                    <input type="password" id="signup-pass" name="password" placeholder="Enter your password" ref={passwordRef} /><br />
                    <label htmlFor="signup-pass-confirm">Confirm Password</label><br />
                    <input type="password" id="signup-pass-confirm" name="pass-confirm" placeholder="Re-enter your password" ref={confirmPasswordRef} />

                    <div className="agreement">
                        <input type="checkbox" id="agreement-check" />
                        <label htmlFor="agreement">I've read and agree with the Terms of Service and our Privacy Policy</label>
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