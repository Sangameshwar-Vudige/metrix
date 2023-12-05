import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import "./Login.css"

const AdminLogin = () => {
    const navigate=useNavigate()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const HandleEvent=async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/adminlogin?email=${email}&password=${password}`);
            
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const result = await response.text();
            console.log(result)
            if(result==="true"){
                localStorage.setItem('loginhas','admin')
                localStorage.setItem('email',email)
                navigate('/adminprojects')
                return
            }
            alert(result)
            
          } catch (error) {
            alert("Something went wrong")
            console.log(error)
          } 
       
    }
    return (
        <div className="login-body">
            <div className="login-container">
                <h2>Admin Login</h2>
                <form onSubmit={HandleEvent} >

                    <label htmlFor="email">Email ID:</label>
                    <input className="input-login" type="email" id="email" name="email" placeholder="Enter your email id" required onChange={(e)=>setEmail(e.target.value)}/>

                    <label htmlFor="password">Password:</label>
                    <input className="input-login" type="password" id="password" name="password" placeholder="Enter your password" required onChange={(e)=>setPassword(e.target.value)}/>
                    <button type="submit" className='input-button'>Login</button>
                    <div className="new-register">Employee login?<Link to="/login">click here</Link></div>
                   
                </form>
            </div>
        </div>
    )
}

export default AdminLogin