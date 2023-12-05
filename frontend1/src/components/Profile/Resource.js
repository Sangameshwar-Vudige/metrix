import React,{useState,useEffect} from 'react'
import AdminNavbar from '../Navbar/AdminNavbar'
import { useNavigate } from 'react-router-dom';
const Resource = () => {
    const navigate = useNavigate();
    const [data,setData]=useState([])
    const [search, setSearch] = useState("")
    useEffect((e) => {
        async function handle() {
            try {
                const response = await fetch(`http://localhost:8000/getprofile`);

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
        handle();
    }, [])
  return (
    <div>
        <AdminNavbar/>
        <div className='right'>
                <input className="input" placeholder='Search username or email' onChange={(e) => setSearch(e.target.value)} />
                <button className='input-button left' onClick={() => navigate("/createprofile")}>Add Resource</button>
            </div>
            {data.map((e, ind) => {
                if (e.email.toLowerCase().includes(search.toLowerCase())||((e.firstname.toLowerCase()+" "+e.lastname.toLowerCase()).includes(search.toLowerCase())))
                    return <table key={ind} className='container'>
                        <tbody>
                            <tr>
                                <td width="20%">{e.firstname} {e.lastname}</td>

                                <td width="60%">{e.email}</td>

                                <td width="20%"><button className='input-button float1-button' onClick={()=>navigate(`/profile/${e.email}`)}>view more</button></td>
                            </tr>
                        </tbody>
                    </table>

            })}
    </div>
  )
}

export default Resource