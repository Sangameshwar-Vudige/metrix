import React, { useState, useEffect } from 'react'
import AdminNavbar from '../Navbar/AdminNavbar'
import './Project.css'
import { useNavigate } from 'react-router-dom'
const AllProjectsDisplay = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")


    const [menuVisible, setMenuVisible] = useState([]);
    const [subMenuVisible, setSubMenuVisible] = useState([]);

    const toggleMenu = (ind) => {
        var change = [...menuVisible]
        change[ind] = !change[ind]
        setMenuVisible(change)
        console.log(menuVisible)
        // setMenuVisible(!menuVisible[ind]);
    };

    const toggleSubMenu = (ind) => {
        var change = [...subMenuVisible]
        change[ind] = !change[ind]

        setSubMenuVisible(change);
    };

    async function handling(projectname) {
        try {
            const response = await fetch(`http://localhost:8000/deleteproject?projectname=${projectname}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.text();
            if (result === "true") {
                alert(`${projectname} is successfully deleted`)
                window.location.reload()
            }


        } catch (error) {
            console.log(error)
        }
    }
    const deleteProject = (projectname, ind) => {
        var res = prompt(`Are you sure want to delete ${projectname} project. if yes type yes`)
        if (res !== null && res.toLowerCase() === "yes") {
            handling(projectname)
        } else {
            var change = [...menuVisible]
            change[ind] = false
            setMenuVisible(change)
        }
    }
    const [type,setType]=useState("")
    useEffect((e) => {
        async function handle() {
            try {
                const response = await fetch(`http://localhost:8000/getprojects`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setData(result)
                setMenuVisible(Array(result.length).fill(false))
                setSubMenuVisible(Array(result.length).fill(false))
                console.log(result)

            } catch (error) {
                console.log(error)
            }
        }
        handle();
    }, [])
    const changeProjectStatus = async (status, ind) => {
        if (status === data[ind].projectstatus)
            return

        try {
            const response = await fetch(`http://localhost:8000/updatestatus?projectname=${data[ind].projectname}&projectstatus=${status}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.text();
            if (result === "true") {
                window.location.reload()
            }
            console.log(result)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <AdminNavbar />
            
            <div className='right'>
                <input className="input" placeholder='Search project here...' onChange={(e) => setSearch(e.target.value)} />
                <button className='input-button left' onClick={() => navigate("/createproject")}>New Project</button>
            </div>
            <div className='type'>
                Type
                <select className='selector' onChange={(e)=>setType(e.target.value)}>
                    <option value="">All</option>
                    <option value="ongoing">ongoing</option>
                    <option value="pending">pending</option>
                    <option value="released">released</option>
                </select>
            </div>
            {data.length === 0 &&
                <div className='container' style={{ marginTop: "80px" }}><center><b>There are no projects are added</b></center></div>}
            {data.map((e, ind) => {
                if (e.projectname.toLowerCase().includes(search.toLowerCase()) && e.projectstatus.includes(type))
                    return <table key={ind} className='container'  >
                        <tbody>
                            <tr>
                                <td width="20%" style={{ cursor: "pointer" }} onClick={() => navigate(`/adminproject/${e.projectname}`)}>{e.projectname}</td>

                                <td width="60%" style={{ cursor: "pointer" }} onClick={() => navigate(`/adminproject/${e.projectname}`)}><input value={e.projectInformation} className="disableinput" type='text' /></td>

                                <td width="15%" >

                                    {e.projectstatus === "ongoing" && <div class="ongoing-message">
                                        <div class="orange-circle"></div>
                                        <div style={{ color: "#f39c12" }}>{e.projectstatus}</div>
                                    </div>}
                                    {e.projectstatus === "pending" && <div class="ongoing-message">
                                        <div class="red-circle"></div>
                                        <div style={{ color: "#e74c3c" }}>{e.projectstatus}</div>
                                    </div>}
                                    {e.projectstatus === "released" && <div class="ongoing-message">
                                        <div class="green-circle"></div>
                                        <div style={{ color: "#2ecc71" }}>{e.projectstatus}</div>
                                    </div>}
                                </td>

                                {/* <td width="20%"><button className='input-button float1-button' onClick={() => navigate(`/adminproject/${e.projectname}`)}>view more</button></td> */}
                                <td width="5%">

                                    <div className="menu-container">
                                        <div className="menu-toggle" onClick={() => toggleMenu(ind)}>
                                            <div className="dot"></div>
                                            <div className="dot"></div>
                                            <div className="dot"></div>
                                        </div>
                                        {menuVisible[ind] && (
                                            <ul className="options" >
                                                <li onClick={() => navigate(`/updateproject/${e.projectname}`)}>Edit</li>
                                                <li onClick={() => deleteProject(e.projectname, ind)}>delete</li>
                                                <li onMouseEnter={() => toggleSubMenu(ind)} onMouseLeave={() => toggleSubMenu(ind)}>
                                                    move
                                                    {subMenuVisible && (
                                                        <ul className="sub-options">
                                                            <li onClick={() => changeProjectStatus("ongoing", ind)}>ongoing</li>
                                                            <li onClick={() => changeProjectStatus("pending", ind)}>pending</li>
                                                            <li onClick={() => changeProjectStatus("released", ind)}>released</li>
                                                        </ul>
                                                    )}
                                                </li>
                                            </ul>
                                        )}
                                    </div>

                                </td>
                            </tr>
                        </tbody>
                    </table>
            })}
        </div>
    )
}

export default AllProjectsDisplay