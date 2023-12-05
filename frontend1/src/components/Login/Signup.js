import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Login.css"
const Signup = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const HandleEvent = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword)
            return alert("Passwords not matched")
        try {
            const response = await fetch(`http://localhost:8000/signup?email=${email}&password=${password}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.text();
            if (result === "true") {
                localStorage.setItem('loginhas', 'user')
                localStorage.setItem('email', email)
                navigate('/createprofile')
                return
            }
            alert(result)


        } catch (error) {

            alert("Something went wrong. try something later")

        }

    }
    return (
        <div className="login-body" style={{ marginTop: "100px" }}>
            <div className="login-container">
                <h2>Employee SignUp</h2>
                <form onSubmit={HandleEvent} >

                    <label htmlFor="email">Email ID:</label>
                    <input className="input-login" type="email" id="email" name="email" placeholder="Enter your email id" required onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Password:</label>
                    <input className="input-login" type="password" id="password" name="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)} />

                    <label htmlFor="confirmpassword">Password:</label>
                    <input className="input-login" type="password" id="confirmpassword" name="confirmpassword" placeholder="Enter confirm password" required onChange={(e) => setConfirmPassword(e.target.value)} />

                    <button className='input-button' type="submit">Login</button>
                    <div className="new-register">Admin login?<Link to="/adminlogin">click here</Link></div>
                    <div className="new-register">Already Registered?<Link to="/login">click here</Link></div>
                </form>
            </div>
        </div>
    )
}

export default Signup