import React from "react";
import './signUp.styles.scss'
function SignUp() {
    return (
        <div className="sign-up-container">
            <div className="sign-up">

                <h2>Sign Up</h2>
                <form action="">
                    <div className="name">
                        <div className="first-name">
                            <label htmlFor="fname">First name</label>
                            <input type="text" id="fname" placeholder="First name" />
                        </div>
                        <div className="last-name">
                            <label htmlFor="lname">Last name</label>
                            <input type="text" id="lname" placeholder="Last name" />
                        </div>
                    </div>
                    <label htmlFor="signup-email">Email</label><br />
                    <input type="text" id="signup-email" placeholder="Enter your email" /><br />
                    <label htmlFor="signup-pass">Password</label><br />
                    <input type="password" id="signup-pass" placeholder="Enter your password" />
                    <div className="signup-opt">
                        <div className="remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <span className="forgot-pass">Forgot password</span>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
                <button className="sign-up-with-google">Signup with google</button>
                <span className="no-account">Don't have an account? Sign Up</span>
            </div>
        </div>
    )
}

export default SignUp