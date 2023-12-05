import React, { useEffect ,useState} from 'react'
import Navbar from '../Navbar/Navbar'
import { useNavigate, useParams } from 'react-router-dom'

const UsersProject = () => {
    const {email}=useParams();
    const [data,setData]=useState([])
    const navigate=useNavigate()
    const [search,setSearch]=useState("")
    useEffect(()=>{
        async function handle(){

            try {
                const response = await fetch(`http://localhost:8000/getprojectresources?email=${email}`);
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const result = await response.json();
                console.log(result)
                setData(result)
    
    
            } catch (error) {
                console.log(error)
            }
            
        }
        handle()
    },[])
  return (
    <div>
        <Navbar/>
        <div className='right'>
                <input className="input" placeholder='Search project here...' onChange={(e) => setSearch(e.target.value)} />
                {/* <button className='input-button left' onClick={() => navigate("/createproject")}>New Project</button> */}
            </div>
            {data.length === 0 &&
                <div className='container' style={{ marginTop: "80px" }}><center><b>You are not included in any project</b></center></div>}
            {data.map((e, ind) => {
                if (e.projectname.toLowerCase().includes(search.toLowerCase()))
                    return <table key={ind} className='container'>
                        <tbody>
                            <tr>
                                <td width="20%">{e.projectname}</td>

                                <td width="60%"><input value={e.projectInformation} className="disableinput" type='text' /></td>

                                <td width="20%"><button className='input-button float1-button'onClick={()=>navigate(`/userprojects/${e.email}/${e.projectname}`)}>view more</button></td>
                            </tr>
                        </tbody>
                    </table>

            })}
    </div>
  )
}

export default UsersProject