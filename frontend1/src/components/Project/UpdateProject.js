import React, { useEffect, useState } from 'react'
import './Project.css'
import { useNavigate, useParams } from 'react-router-dom'
const UpdateProject = () => {
    const { projectname } = useParams()
    const navigate = useNavigate()
    const [otherskills, setOtherskills] = useState("")
    // const [projectname, setProjectName] = useState("")
    const [projectInfo, setProjectInfo] = useState("")
    const [projectClients, setProjectClients] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [checkboxes, setCheckboxes] = useState({
        WebSDK: false,
        Botkit: false,
        ITAssist: false,
        AgentAssist: false,
        SearchAssist: false,
        SmartAssist: false,
        XOPlatform: false,
    });
    const handleCheckboxChange = (checkboxName) => {
        setCheckboxes({
            ...checkboxes,
            [checkboxName]: !checkboxes[checkboxName],
        });
    };

    const onsubmit = async (e) => {
        e.preventDefault();
        const postData = {
            projectname: projectname,
            projectInformation: projectInfo,
            projectClients: projectClients,
            startDate: startDate,
            endDate: endDate,
            koreskills: checkboxes,
            otherskills: otherskills,
        }
        try {
            const response = await fetch("http://localhost:8000/updateproject", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.text();
            if (result === "true") {
                navigate("/adminprojects")
                return
            }

        } catch (error) {

            alert("Something went wrong. try something later")

        }
        console.log(postData)
    }

    useEffect(() => {
        async function handle() {
            try {
                const response = await fetch(`http://localhost:8000/getprojects?projectname=${projectname}`)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();

                // console.log(result)
                // projectname: projectname,
                // projectInformation: projectInfo,
                // projectClients: projectClients,
                // startDate: startDate,
                // endDate: endDate,
                // koreskills: checkboxes,
                // otherskills: otherskills,   
                setProjectInfo(result[0].projectInformation)
                setProjectClients(result[0].projectClients)
                setStartDate(result[0].startDate)
                setEndDate(result[0].endDate)
                var skills = {
                    WebSDK: false,
                    Botkit: false,
                    ITAssist: false,
                    AgentAssist: false,
                    SearchAssist: false,
                    SmartAssist: false,
                    XOPlatform: false,
                }

                result[0].koreskills.map(e => {
                    skills[e] = true
                })
                setCheckboxes(skills)
                setOtherskills(result[0].otherskills.join(","))


            } catch (error) {

                alert("Something went wrong. try something later")

            }
        }
        handle()
    }, [])
    return (
        <div className='container-2'>
            <form onSubmit={onsubmit}>
                <center><h3>Edit Project</h3></center>
                <table>
                    <tbody>
                        <tr>
                            <td >Project Name: <span style={{ color: "red" }}><b> *</b></span><br /></td>

                            <td><input type='text' disabled className='inputname1' required value={projectname} /></td>
                        </tr>
                        <tr>
                            <td >Project Description:<span style={{ color: "red" }}><b> *</b></span><br /></td>

                            <td> <textarea value={projectInfo} style={{ width: "443px", height: "173px" }} onChange={(e) => setProjectInfo(e.target.value)}></textarea></td>
                        </tr>
                        <tr>
                            <td >Project Clients:<span style={{ color: "red" }}><b> *</b></span><br /></td>

                            <td> <textarea value={projectClients} style={{ width: "443px", height: "60px" }} onChange={(e) => setProjectClients(e.target.value)}></textarea></td>
                        </tr>
                        <tr>
                            <td>Start Date:</td>
                            <td><input type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>End Date:</td>
                            <td><input type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} /></td>
                        </tr>

                    </tbody>

                </table>
                <h4>Kore Skills</h4>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={checkboxes.XOPlatform}
                                        onChange={() => handleCheckboxChange('XOPlatform')}
                                    />
                                    XO Platform
                                </label>
                            </td>
                            <td>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={checkboxes.SmartAssist}
                                        onChange={() => handleCheckboxChange('SmartAssist')}
                                    />
                                    SmartAssist
                                </label>
                            </td>
                            <td>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={checkboxes.ITAssist}
                                        onChange={() => handleCheckboxChange('ITAssist')}
                                    />
                                    ITAssist
                                </label>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={checkboxes.AgentAssist}
                                        onChange={() => handleCheckboxChange('AgentAssist')}
                                    />
                                    AgentAssist
                                </label>
                            </td >
                            <td>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={checkboxes.SearchAssist}
                                        onChange={() => handleCheckboxChange('SearchAssist')}
                                    />
                                    SearchAssist
                                </label>
                            </td>
                            <td>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={checkboxes.WebSDK}
                                        onChange={() => handleCheckboxChange('WebSDK')}
                                    />
                                    WebSDK
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={checkboxes.Botkit}
                                        onChange={() => handleCheckboxChange('Botkit')}
                                    />
                                    Botkit
                                </label>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h4>Other Skills</h4>
                <div>
                    <textarea value={otherskills} style={{ width: "750px", height: "153px" }} onChange={(e) => setOtherskills(e.target.value)}>

                    </textarea>
                </div>
                <div><button className='cancel' onClick={e => navigate(`/adminprojects`)}>Cancel</button> <button type='submit' className='input-button' style={{ float: "right", marginRight: "50px" }}>Save</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateProject