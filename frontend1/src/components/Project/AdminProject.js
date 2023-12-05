import Modal from 'react-modal';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../Navbar/AdminNavbar';
Modal.setAppElement('#root');
const AdminProject = () => {
    const { projectname } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [resources, setResources] = useState({
        ProjectManager: [],
        Architect: [],
        BusinessAnalyst: [],
        Teamlead: [],
        Developer: [],
        NLPEngineer: [],
        QualityAnalyst: []
    })

    const [isModalOpen, setIsModalOpen] = useState(false);
    const changeDate = (date) => {
        let dateString = date;
        let dateObject = new Date(dateString);
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let humanReadableDate = dateObject.toLocaleDateString('en-US', options);
        return humanReadableDate
    }
    const [profile, setProfile] = useState("")
    const [profiles, setProfiles] = useState({
        ProjectManager: [],
        Architect: [],
        BusinessAnalyst: [],
        Teamlead: [],
        Developer: [],
        NLPEngineer: [],
        QualityAnalyst: []
    });
    const [test, setTest] = useState({
        ProjectManager: {
            email: "",
            percentage: "",
            startDate: "",
            endDate: ""
        },
        Architect: {
            email: "",
            percentage: "",
            startDate: "",
            endDate: ""
        },
        BusinessAnalyst: {
            email: "",
            percentage: "",
            startDate: "",
            endDate: ""
        },
        Teamlead: {
            email: "",
            percentage: "",
            startDate: "",
            endDate: ""
        },
        Developer: {
            email: "",
            percentage: "",
            startDate: "",
            endDate: ""
        },
        NLPEngineer: {
            email: "",
            percentage: "",
            startDate: "",
            endDate: ""
        },
        QualityAnalyst: {
            email: "",
            percentage: "",
            startDate: "",
            endDate: ""
        }
    })
    const [keys, setKeys] = useState(Object.keys(profiles))
    const [projectResource, setProjectResource] = useState([])
    const addRow = async (e) => {
        if (test[e].email === "" || test[e].percentage === "" || test[e].startDate === "" || test[e].endDate === "") {
            alert("Please Select all the data to add new row")
            return
        }

        const postData = {
            projectname: projectname,
            email: test[e].email,
            title: e,
            percentage: test[e].percentage,
            endDate: test[e].endDate,
            startDate: test[e].startDate,
            projectInformation: data[0].projectInformation,
            projectstatus: data[0].projectstatus,
        }
        try {
            const response = await fetch("http://localhost:8000/createprojectresources", {
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
            if (result === "true")
                alert("Data data successfully")

        } catch (error) {
            console.log(error)
        }
        setProfiles({ ...profiles, [e]: [...profiles[e], test[e]] })

        setTest({
            ...test, [e]: {
                email: "",
                percentage: "",
                startDate: "",
                endDate: ""
            }
        })


    }
    const deleteRow = async (e, index) => {
        const updateRow = profiles[e]
        console.log(updateRow)
        try {
            const response = await fetch(`http://localhost:8000/deleteprojectresources?email=${updateRow[index].email}&percentage=${updateRow[index].percentage}&projectname=${projectname}`)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.text();
            if (result === "true") {
                alert("Data deleted successfully")
            }


        } catch (error) {
            console.log(error)
        }
        updateRow.splice(index, 1)
        setProfiles({ ...profiles, [e]: updateRow })

        setKeys(keys)
    }


    const handleSelectChange = (e1, value) => {
        setProfile(e1)
        // setSou(e1)
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalSave = (value) => {
        setTest({ ...test, [profile]: { ...test[profile], email: value } })
        // handleInputChange(ind, 'email', value, sou)
        setIsModalOpen(false);
    };





    useEffect((e) => {
        async function handle() {
            try {
                const response = await fetch(`http://localhost:8000/getprojects?projectname=${projectname}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setData(result)

            } catch (error) {
                console.log(error)
            }

            try {
                const response = await fetch(`http://localhost:8000/getprofile`);

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
                setResources(res)


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


            } catch (error) {
                console.log(error)
            }
        }

        handle();

    }, [])



    const [checkboxes1, setCheckboxes1] = useState({
        All: true,
        Skills: false,
        Available: false,
    });

    const handleCheckboxChange1 = (checkboxName) => {
        if (checkboxName !== "All") {
            checkboxes1.All = false

        }
        if (checkboxName === "All") {
            checkboxes1.Skills = false
            checkboxes1.Available = false

        }

        setCheckboxes1({
            ...checkboxes1,
            [checkboxName]: !checkboxes1[checkboxName],
        });
    };
    const list = ["List of Project Managers",
        "List of Architect",
        "List of BusinessAnalyst",
        "List of Teamleads",
        "List of Developer",
        "List of NLPEngineer",
        "List of Quality Analyst"]


    const changeValue=(e1,index,input,value)=>{
        var req=[...profiles[e1]]
        console.log(req)
        req[index][input]=value
        setProfiles({...profiles,[e1]:req})

    }
    const updateRow=async(e1,index)=>{
        const postData=profiles[e1][index]
        
        try {
            const response = await fetch("http://localhost:8000/updateprojectresources", {
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
            if (result === "true")
                alert("data updated successfully")

        } catch (error) {
            console.log(error)
        }
    }
    const moveRow=async(e1,index)=>{
        const postData=profiles[e1][index]
        
        try {
            const response = await fetch("http://localhost:8000/updateprojectresources", {
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
            if (result === "true")
                alert("data updated successfully")

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <AdminNavbar />
            {data.length !== 0 &&
                <div >
                    <center><h3>Project Information</h3></center>
                    <div className='container-2' style={{ width: "70%" }}>
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

                            {keys.map((e, ind) => {
                                return <div>
                                    <h4>{list[ind]}</h4>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Email</th>
                                                <th>Percentage</th>
                                                <th>Start-Date</th>
                                                <th>End-Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {profiles[e].map((e1, index) => {
                                                return <tr key={index}>
                                                    <td>
                                                        <select style={{ width: "220px" }} value={e1.email}>
                                                            <option style={{ width: "220px" }}>{e1.email}</option>

                                                        </select>
                                                    </td>
                                                    <td>
                                                        <input value={e1.percentage} type="number" onChange={(m)=>changeValue(e,index,"percentage",m.target.value)} />
                                                    </td>
                                                    <td>
                                                        <input value={e1.startDate} type="date" onChange={(m)=>changeValue(e,index,"startDate",m.target.value)}/>
                                                    </td>
                                                    <td>
                                                        <input value={e1.endDate} type="date" onChange={(m)=>changeValue(e,index,"endDate",m.target.value)}/>
                                                    </td>
                                                    <td>

                                                        <button style={{ margin: "0px 1px" }} className='input-button' onClick={() => deleteRow(e, index)}>Delete</button>
                                                        <button style={{ margin: "0px 1px" }} className='input-button' onClick={() => updateRow(e, index)} >update</button>
                                                        <button style={{ margin: "0px 1px" }} className='input-button'  onClick={() => moveRow(e, index)}>move</button>
                                                    </td>
                                                </tr>
                                            })}
                                            <tr>
                                                <td>
                                                    <select style={{ width: "220px" }} value={test[e].email} onClick={(m) => handleSelectChange(e, m.target.value)}>
                                                        <option style={{ width: "220px" }}>select</option>
                                                        {resources[e].length !== 0 && resources[e].map((m, ind) => {
                                                            return <option value={m.email}>{m.email}</option>
                                                        })}

                                                    </select>
                                                </td>
                                                <td >
                                                    <input value={test[e].percentage} type="number" onChange={(m) => setTest({ ...test, [e]: { ...test[e], percentage: m.target.value } })} />
                                                </td>
                                                <td>
                                                    <input value={test[e].startDate} type="date" onChange={(m) => setTest({ ...test, [e]: { ...test[e], startDate: m.target.value } })} />
                                                </td>
                                                <td>
                                                    <input value={test[e].endDate} type="date" onChange={(m) => setTest({ ...test, [e]: { ...test[e], endDate: m.target.value } })} />
                                                </td>
                                                <td>
                                                    <button className='input-button' onClick={() => addRow(e)}>Add</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            })}
                        </div>
                    </div>
                    <Modal isOpen={isModalOpen} onRequestClose={handleModalClose}>

                        <div>
                            <label className="label">
                                <input
                                    type="checkbox"
                                    checked={checkboxes1.All}
                                    onChange={() => handleCheckboxChange1('All')}
                                />
                                ALL
                            </label>

                            <label className="label">
                                <input
                                    type="checkbox"
                                    checked={checkboxes1.Skills}
                                    onChange={() => handleCheckboxChange1('Skills')}
                                />
                                Skills Matched
                            </label>

                            <label className="label">
                                <input
                                    type="checkbox"
                                    checked={checkboxes1.Available}
                                    onChange={() => handleCheckboxChange1('Available')}
                                />
                                Avaiable
                            </label>
                        </div>

                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>
                                        S.No
                                    </th>
                                    <th>
                                        Email
                                    </th>
                                    <th>
                                        User Name
                                    </th>
                                    <th>
                                        Total Percentage<br />(All Projects)
                                    </th>
                                    <th>
                                        Skills Matched
                                    </th>
                                    <th>
                                        Resource Info
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {checkboxes1.All == true && resources[profile] !== undefined && resources[profile].map((e, index) => {
                                    const commonValues1 = data[0].koreskills.filter(item => e.koreskills.includes(item));
                                    const commonValues2 = data[0].otherskills.filter(item => e.otherskills.includes(item));
                                    return <tr key={index}>

                                        <td className='td'>{index + 1}</td>
                                        <td className='td'>{e.email}</td>
                                        <td className='td'>{e.firstname} {e.lastname}</td>
                                        <td className='td'>{e.totalpercentage}</td>
                                        <td className='td'>{[...commonValues1, ...commonValues2,].map(e => <li>{e}</li>)}</td>
                                        <td className='td'><a href={`/profile/${e.email}`} target='_blank'>Resource Profile</a></td>
                                        <td className='td'><button onClick={() => handleModalSave(e.email)}>Add</button></td>

                                    </tr>
                                })}
                                {checkboxes1.Available == true && checkboxes1.Skills == false && resources[profile] !== undefined && resources[profile].map((e, index) => {
                                    const commonValues1 = data[0].koreskills.filter(item => e.koreskills.includes(item));
                                    const commonValues2 = data[0].otherskills.filter(item => e.otherskills.includes(item));
                                    if (parseInt(e.totalpercentage) < 100)
                                        return <tr key={index}>

                                            <td className='td'>{index + 1}</td>
                                            <td className='td'>{e.email}</td>
                                            <td className='td'>{e.firstname} {e.lastname}</td>
                                            <td className='td'>{e.totalpercentage}</td>
                                            <td className='td'>{[...commonValues1, ...commonValues2,].map(e => <li>{e}</li>)}</td>
                                            <td className='td'><a href={`/profile/${e.email}`} target='_blank'>Resource Profile</a></td>
                                            <td className='td'><button onClick={() => handleModalSave(e.email)}>Add</button></td>

                                        </tr>
                                })}
                                {checkboxes1.Skills == true && checkboxes1.Available == false && resources[profile] !== undefined && resources[profile].map((e, index) => {



                                    // Find common values
                                    const commonValues1 = data[0].koreskills.filter(item => e.koreskills.includes(item));
                                    const commonValues2 = data[0].otherskills.filter(item => e.otherskills.includes(item));


                                    console.log(commonValues1, commonValues2)
                                    if (commonValues2.length >= 1 || commonValues1.length >= 1)
                                        return <tr key={index}>

                                            <td className='td'>{index + 1}</td>
                                            <td className='td'>{e.email}</td>
                                            <td className='td'>{e.firstname} {e.lastname}</td>
                                            <td className='td'>{e.totalpercentage}</td>
                                            <td className='td'>{[...commonValues1, ...commonValues2,].map(e => <li>{e}</li>)}</td>
                                            <td className='td'><a href={`/profile/${e.email}`} target='_blank'>Resource Profile</a></td>
                                            <td className='td'><button onClick={() => handleModalSave(e.email)}>Add</button></td>

                                        </tr>
                                })}
                                {checkboxes1.Skills == true && checkboxes1.Available == true && resources[profile] !== undefined && resources[profile].map((e, index) => {
                                    // Find common values
                                    const commonValues1 = data[0].koreskills.filter(item => e.koreskills.includes(item));
                                    const commonValues2 = data[0].otherskills.filter(item => e.otherskills.includes(item));



                                    if ((commonValues2.length >= 1 || commonValues1.length >= 1) && e.totalpercentage < 100)
                                        return <tr key={index}>

                                            <td className='td'>{index + 1}</td>
                                            <td className='td'>{e.email}</td>
                                            <td className='td'>{e.firstname} {e.lastname}</td>
                                            <td className='td'>{e.totalpercentage}</td>
                                            <td className='td'>{[...commonValues1, ...commonValues2,].map(e => <li>{e}</li>)}</td>
                                            <td className='td'><a href={`/profile/${e.email}`} target='_blank'>Resource Profile</a></td>
                                            <td className='td'><button onClick={() => handleModalSave(e.email)}>Add</button></td>

                                        </tr>
                                })}



                            </tbody>
                        </table>
                        {profile !== undefined && resources[profile] !== undefined && resources[profile].length === 0 && <div><center>No Resource are available</center></div>}
                    </Modal>
                </div>
            }
        </div>
    )
}

export default AdminProject