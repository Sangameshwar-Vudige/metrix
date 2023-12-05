import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Profile.css"
import { useParams } from 'react-router-dom';
const EditProfile = () => {
    const { email } = useParams();
    const navigate = useNavigate()
    const [checkboxes, setCheckboxes] = useState({
        WebSDK: false,
        Botkit: false,
        ITAssist: false,
        AgentAssist: false,
        SearchAssist: false,
        SmartAssist: false,
        XOPlatform: false,
    });
    const [otherskills, setOtherskills] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [title, setTitle] = useState("")
    const [role, setRole] = useState("")

    const [phonenumber, setPhonenumber] = useState(0)
    const [exp, setExp] = useState(0)
    const [photo, setPhoto] = useState("")

    const handleCheckboxChange = (checkboxName) => {
        setCheckboxes({
            ...checkboxes,
            [checkboxName]: !checkboxes[checkboxName],
        });
    };
    const onSubmit = async (e) => {
        e.preventDefault();

        var postData = {

            firstname: firstname,
            lastname: lastname,
            title: title,
            role: role,
            email: email,
            phonenumber: phonenumber,
            experience: exp,
            photo: photo,
            koreskills: checkboxes,
            otherskills: otherskills

        }
        console.log(postData)
        try {
            const response = await fetch("http://localhost:8000/updateprofile", {
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
                navigate(`/profile/${email}`)
            }

        } catch (error) {

            alert("Something went wrong. try something later")

        }
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64Data = reader.result.split(',')[1];
                console.log(base64Data)
                setPhoto(`data:${file.type};base64,${base64Data}`);
            };

            reader.readAsDataURL(file);
        }
    };
    useEffect(() => {
        async function request() {
            try {
                const response = await fetch(`http://localhost:8000/getprofile?email=${email}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setFirstname(result[0].firstname)
                setLastname(result[0].lastname)
                setRole(result[0].role)
                setTitle(result[0].title)
                setPhonenumber(result[0].phonenumber)
                setExp(result[0].experience)
                setPhoto(result[0].photo)

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

            }
            catch (err) {
                alert("Something went wrong!")
                console.error(err)

            }
        }

        request()
    }, [])
    return (
        <div className='container-2'>
            <form onSubmit={onSubmit}>
                <center><h2>Edit Profile</h2></center>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>First Name<span style={{ color: "red" }}><b> *</b></span><br />
                                    <input value={firstname} type='text' className='inputname' required onChange={(e) => setFirstname(e.target.value)} /></td>
                                <td> Surname<span style={{ color: "red" }}><b> *</b></span><br />
                                    <input value={lastname} type='text' className='inputname' required onChange={(e) => setLastname(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td>Title<span style={{ color: "red" }}><b> *</b></span><br />
                                    <select value={title} className='selectinput' onChange={(e) => setTitle(e.target.value)}>
                                        <option>Select</option>
                                        <option value="ProjectManager">Project Manager</option>
                                        <option value="Architect">Architect</option>
                                        <option value="Teamlead">Team lead</option>
                                        <option value="BusinessAnalyst">Business Analyst</option>
                                        <option value="Developer">Developer</option>
                                        <option value="QualityAnalyst">Quality Analyst</option>
                                        <option value="NLPEngineer">NLP Engineer</option>
                                    </select>
                                </td>
                                <td>Role<span style={{ color: "red" }}><b> *</b></span><br />
                                    <input value={role} type='text' className='inputname' required onChange={(e) => setRole(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td>Email<span style={{ color: "red" }}><b> *</b></span><br />
                                    <input value={email} type='text' className='inputname' required disabled /></td>
                                <td> Phone Number<span style={{ color: "red" }}><b> *</b></span><br />
                                    <input value={phonenumber} type='number' className='inputname' required onChange={(e) => setPhonenumber(e.target.value)} /></td>
                            </tr>
                            <tr>

                                <td>Years of Experience<span style={{ color: "red" }}><b> *</b></span><br />
                                    <input value={exp} type='number' className='inputname' required onChange={(e) => setExp(e.target.value)} /></td>
                            </tr>
                            <tr>

                                <td>Photo<br />
                                    <input type="file" onChange={handleFileChange} /></td>
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

                </div>
                <div>
                    <button className='cancel' onClick={e=>navigate(`/profile/${email}`)}>Cancel</button> <button type='submit' className='input-button' style={{float: "right",marginRight: "50px"}}>Save</button>
                </div>
            </form >
        </div >
    )
}

export default EditProfile