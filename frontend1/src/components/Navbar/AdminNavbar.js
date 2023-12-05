import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Assuming you have a CSS file for styling

const AdminNavbar = () => {
    const navigate=useNavigate();
    const [activeTab, setActiveTab] = useState(window.location.pathname);


    return (
        <nav className="navbar">
            <div className="logo">Project</div>
            <ul className="nav-list">
                <li
                    className={activeTab.includes('/adminproject') ? 'active' : 'text'}

                >
                    <Link to="/adminprojects" className={activeTab.includes('/adminproject') ? 'active' : 'text'}>
                        Projects
                    </Link>
                </li>

                <li
                    className={(activeTab.includes('/resources')||activeTab.includes('/profile') ) ? 'active' : 'text'}
                >
                    <Link to={`/resources`} className={(activeTab.includes('/resources')||activeTab.includes('/profile') ) ? 'active' : 'text'}>Resources</Link>
                </li>
                

            </ul>
            <div className='logout' onClick={()=>{navigate("/adminlogin")}}>
           
                    logout
           
            </div>
        </nav>
    );
};

export default AdminNavbar;



