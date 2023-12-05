import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Signup from './components/Login/Signup';
import Login from './components/Login/Login';
import AdminLogin from './components/Login/AdminLogin';
import CreateProfile from './components/Profile/CreateProfile';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';
import CreateProject from './components/Project/CreateProject';
import AllProjectsDisplay from './components/Project/AllProjectsDisplay';
import Resource from './components/Profile/Resource';
import AdminProject from './components/Project/AdminProject';
import UsersProject from './components/Project/UsersProject';
import UserProject from './components/Project/UserProject';
import UpdateProject from './components/Project/UpdateProject';
function App() {
  return (
    <Router>


      <Routes>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/createprofile" element={<CreateProfile />} />
        <Route path="/profile/:email" element={<Profile />} />
        <Route path="/editprofile/:email" element={<EditProfile />} />
        <Route path="/createproject" element={<CreateProject/>}/>
        <Route path='/adminprojects' element={<AllProjectsDisplay/>}/>
        <Route path='/resources' element={<Resource/>}/>
        <Route path='/adminproject/:projectname' element={<AdminProject/>}/>
        <Route path='/userprojects/:email/:projectname' element={<UserProject/>}/>
        <Route path='/userprojects/:email' element={<UsersProject/>}/>
        <Route path='/updateproject/:projectname' element={<UpdateProject/>}/>

      </Routes>


    </Router>

  );
}

export default App;
