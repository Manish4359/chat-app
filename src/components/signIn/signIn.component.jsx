import React, { useState } from "react";
import './signIn.styles.scss'

function SignIn() {

    const [data, setdata] = useState('0')
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const inputHandler = (e) => {

        if (e.target.name === 'email') {
            setEmail(e.target.value)
        }
        if (e.target.name === "password") {
            setPassword(e.target.value);
        }

        console.log(email, password)

    }

    const fetchdata = async (e) => {
        e.preventDefault()

        await fetch('http://localhost:8080/signin', {
            method: 'POST',
            headers:{
                'Access-Control-Allow-Origin':'http://localhost:8080',
                'vary':'origin',
                "content-type":"application/json"
            },
            mode:'cors',
            body: JSON.stringify({email,password})
            
        })
            .then(res => {
                console.log(res)
                console.log(email, password)

                return res.json()
            })
            .then(text => {
                console.log(text)
                setdata(text.data)
            })
            .catch((err) => console.log(`error occured: ${err}`))
    }

    return (
        <div className="sign-in-container">
            <div className="sign-in">

                <p>server responded with : {data}</p>
                <h2>Welcome back</h2>
                <h3>welcome back! please enter your details</h3>
                <form onSubmit={fetchdata}>
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
                    <button type="submit">Sign In</button>
                </form>
                <button className="sign-in-with-google">SignIn with google</button>
                <span className="no-account">Don't have an account? Sign Up</span>
            </div>
        </div>
    )
}



export default SignIn