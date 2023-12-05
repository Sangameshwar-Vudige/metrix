import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
const UserProject = () => {
    const navigate=useNavigate()
    const { projectname } = useParams()
    const [data, setData] = useState([])
    const [profiles, setProfiles] = useState({})
    const changeDate = (date) => {
        let dateString = date;
        let dateObject = new Date(dateString);
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let humanReadableDate = dateObject.toLocaleDateString('en-US', options);
        return humanReadableDate
    }
    const source = Object.keys(profiles)
    useEffect(() => {
        async function handle() {
            try {
                const response = await fetch(`http://localhost:8000/getprojects?projectname=${projectname}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                console.log(result)
                setData(result)

            } catch (error) {
                console.log(error)
            }
            try {
                const response = await fetch(`http://localhost:8000/getprojectresources?projectname=${projectname}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                var res = {
                    ProjectManager: [],
                    Architect: [],
                    BusinessAnalyst: [],
                    Teamlead: [],
                    Developer: [],
                    NLPEngineer: [],
                    QualityAnalyst: []
                }
                result.map((e) => {
                    res[e.title].push(e)
                })
                setProfiles(res)
                console.log(result)


            } catch (error) {
                console.log(error)
            }
        }
        handle()
    }, [])

    return (
        <div>
            <Navbar />
            {data.length !== 0 &&
                <div >
                    <center><h3>Project Information</h3></center>
                    <div className='container-2'>
                        <div>
                            <div className='title'>
                                Project Name
                            </div>
                            <div className='projectname'>
                                {data[0].projectname}
                            </div>
                        </div>
                        <div>
                            <div className='title'>
                                Project Description
                            </div>
                            <div className='description'>
                                {data[0].projectInformation}
                            </div>
                        </div>
                        <div>
                            <div className='title'>
                                Project Clients
                            </div>
                            <div className='description'>
                                {data[0].projectClients}
                            </div>
                        </div>
                        <div>
                            <div className='title'>
                                Start Date
                            </div>
                            <div className='description'>

                                {changeDate(data[0].startDate)}
                            </div>
                        </div>
                        <div>
                            <div className='title'>
                                End Date
                            </div>
                            <div className='description'>

                                {changeDate(data[0].endDate)}
                            </div>

                        </div>
                        <div>
                            <div className='title'>
                                Required Kore Skills
                            </div>
                            <div className='description'>
                                <div className='flex'>
                                    {data[0].koreskills.map(e => {
                                        return <li style={{ margin: "10px" }}>{e}</li>
                                    })}
                                </div>

                            </div>

                        </div>
                        <div>
                            <div className='title'>
                                Required Other Skills
                            </div>
                            <div className='description'>
                                <div className='flex'>
                                    {data[0].otherskills.map(e => {
                                        return <li style={{ margin: "10px" }}>{e}</li>
                                    })}
                                </div>
                            </div>

                        </div>
                        <div>
                            {source.map((e) => {
                                return <div>
                                    <h3>{e}</h3>
                                    {profiles[e].length === 0 && <div> No {e} Are Allocated in this project</div>}
                                    {profiles[e].length !== 0 && <div>
                                        <table className='table'>
                                            <thead>
                                            <tr>

                                                <th>Email</th>
                                                <th>Percentage</th>
                                                <th>Start-Date</th>
                                                <th>End-Date</th>
                                                <th>Resource Profile</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {profiles[e].map((e1) => {
                                            return <tr>
                                                <td className='td'>{e1.email}</td>
                                                <td className='td'>{e1.percentage}</td>
                                                <td className='td'>{e1.startDate}</td>
                                                <td className='td'>{e1.endDate}</td>
                                                <td className='td' ><span style={{color: "blue",cursor: "pointer"}}onClick={()=>navigate(`/profile/${e1.email}`)}>Profile</span></td>
                                            </tr>
                                        })}
                                            </tbody>
                                        </table>
                                        
                                    </div>}
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserProject