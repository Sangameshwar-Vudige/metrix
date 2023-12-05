import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Assuming you have a CSS file for styling

const Navbar = () => {
    const navigate=useNavigate();
    const [activeTab, setActiveTab] = useState(window.location.pathname);


    return (
        <nav className="navbar">
            <div className="logo">Project</div>
            <ul className="nav-list">
                <li
                    className={activeTab.includes('/userprojects') ? 'active' : 'text'}

                >
                    <Link to={`/userprojects/${localStorage.getItem('email')}`} className={activeTab.includes('/userprojects') ? 'active' : 'text'}>
                        Projects
                    </Link>
                </li>

                <li
                    className={activeTab.includes('/profile') ? 'active' : 'text'}
                >
                    <Link to={`/profile/${localStorage.getItem('email')}`} className={activeTab.includes('/profile') ? 'active' : 'text'}>Profile</Link>
                </li>
              

            </ul>
            <div className='logout' onClick={()=>{navigate("/login")}}>
           
                    logout
           
            </div>
        </nav>
    );
};

export default Navbar;



