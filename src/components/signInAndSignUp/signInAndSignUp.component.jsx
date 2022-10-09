import React from "react";
import SignIn from "../signIn/signIn.component";
import SignUp from "../signUp/signUp.component";
import './signInAndSignUp.styles.scss'


function SignInAndSignUp({setUser}) {

    return (
        <div className="signin-and-signup">
            <SignIn />
        </div>
    )
}

export default SignInAndSignUp