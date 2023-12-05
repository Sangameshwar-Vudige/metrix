import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Login.css"
const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const HandleEvent = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/login?email=${email}&password=${password}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.text();
            localStorage.setItem('loginhas', 'user')
            localStorage.setItem('email', email)
            console.log(result)
            if (result == "true") {
                navigate(`/profile/${email}`)
                return
            }

            else if (result == "false") {
                navigate('/createprofile')
                return
            }
            else
                alert(result)

        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className="login-body">
            <div className="login-container">
                <h2>Employee Login</h2>
                <form onSubmit={HandleEvent} >

                    <label htmlFor="email">Email ID:</label>
                    <input className="input-login" type="email" id="email" name="email" placeholder="Enter your email id" required onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Password:</label>
                    <input className="input-login" type="password" id="password" name="password" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)} />
                    <button className='input-button' type="submit">Login</button>
                    <div className="new-register">Admin login?<Link to="/adminlogin">click here</Link></div>
                    <div className="new-register"> New Register?<Link to="/signup">click here</Link></div>
                </form>
            </div>
        </div>
    )
}

export default Login