import React, { useEffect, useState } from 'react'
import './Profile.css'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import {  useParams } from 'react-router-dom';
import AdminNavbar from '../Navbar/AdminNavbar';
const Profile = () => {
    const { email } = useParams();
    const navigate = useNavigate()
    const loginhas=localStorage.getItem("loginhas")

    const [data, setData] = useState([])
    const [projects,setProjects]=useState([])
    const [current,setCurrent]=useState([])
    const [released,setReleased]=useState([])
    useEffect((e) => {
        async function handle1(){
            try {
                const response = await fetch(`http://localhost:8000/getprojectresources?email=${email}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                var cur=[],res=[];
                setProjects(result)
                result.forEach((e)=>{
                    if(e.projectstatus==="released")
                    res.push(e)
                   else
                   cur.push(e)
                })
                setCurrent(cur)
                setReleased(res)

            } catch (error) {
                console.log(error)
            }
            try {
                const response = await fetch(`http://localhost:8000/getprofile?email=${email}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();

           
                setData(result)

            } catch (error) {
                console.log(error)
            }
        }
      
       
        handle1();
    }, [])
    console.log(current)
    console.log(released)
    return (
        <div>{data.length !== 0 &&
            <div>
               {loginhas!=="admin"&& <Navbar />}
               {loginhas==="admin"&& <AdminNavbar/>}
                <div className='container'>
                    <div><button className='Edit input-button' onClick={(e)=>navigate(`/editprofile/${email}`)}>Edit</button></div>
                    <div>
                        <h3>Basic Details</h3>
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <td className="td">
                                        Name
                                    </td>
                                    <td className="td">
                                         {data[0].firstname} {data[0].lastname}
                                    </td>
                                    <td rowSpan="6">
                                        <center><img src={data[0].photo !== "" ? data[0].photo : "data:image/png;base64,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"} alt="" /></center>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td">
                                        Title
                                    </td>
                                    <td className="td">
                                         {data[0].title}
                                    </td>

                                </tr>
                                <tr>
                                    <td className="td">
                                        Role
                                    </td>
                                    <td className="td">
                                         {data[0].role}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td">
                                        Email
                                    </td>
                                    <td className="td">
                                         {data[0].email}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td">
                                        Phone Number
                                    </td>
                                    <td className="td">
                                         {data[0].phonenumber}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td">
                                        Year of Experience
                                    </td>
                                    <td className="td">
                                         {data[0].experience}yr
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <h3>Current Projects</h3>
                        {current.length === 0 &&
                            <div>Not Included in Any Projects</div>}
                        {current.length !== 0 &&

                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>
                                            S.No
                                        </th>
                                        <th>
                                            Project Name
                                        </th>
                                        <th>
                                            Percentage
                                        </th>
                                        <th>
                                            Start-Date
                                        </th>
                                        <th>
                                            End-Date
                                        </th>
                                        <th>
                                            Project Status
                                        </th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    {current.map((e,index)=>{
                    
                                        return <tr>
                                            <td className="td">{index+1}</td>
                                            <td className="td">{e.projectname}</td>
                                            <td className="td">{e.percentage}</td>
                                            <td className="td">{e.startDate}</td>
                                            <td className="td">{e.endDate}</td>
                                            <td className="td">{e.projectstatus}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                            }
                       <h3>Previous Projects</h3>
                        {released.length === 0 &&
                            <div>Not Included in Any Projects</div>}
                        {released.length !== 0 &&

                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>
                                            S.No
                                        </th>
                                        <th>
                                            Project Name
                                        </th>
                                        <th>
                                            Percentage
                                        </th>
                                        <th>
                                            Start-Date
                                        </th>
                                        <th>
                                            End-Date
                                        </th>
                                        
                                        <th>
                                            Project Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {released.map((e,index)=>{
                    
                                        return <tr>
                                            <td className="td">{index+1}</td>
                                            <td className="td">{e.projectname}</td>
                                            <td className="td">{e.percentage}</td>
                                            <td className="td">{e.startDate}</td>
                                            <td className="td">{e.endDate}</td>
                                            <td className="td">{e.projectstatus}</td>
                                           
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                            }
                        <h3>Kore Skills</h3>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>
                                        S.No
                                    </th>
                                    <th>
                                        Skill
                                    </th>


                                </tr>
                            </thead>
                            <tbody>
                                {data[0].koreskills.map((e, index) => {
                                    return <tr key={index}>
                                        <td className="td">{index + 1}</td>
                                        <td className="td">{e}</td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                        <h3>Other Skills</h3>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>
                                        S.No
                                    </th>
                                    <th>
                                        Skill
                                    </th>


                                </tr>
                            </thead>
                            <tbody>
                                {data[0].otherskills.map((e, index) => {
                                    return <tr key={index}>
                                        <td className="td">{index + 1}</td>
                                        <td className="td">{e}</td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                        {/* <h4>Other Skills</h4>
                        <div>
                            {data[0].otherskills}
                        </div> */}
                    </div>
                </div>
            </div>
        }

        </div>
    )
}

export default Profile