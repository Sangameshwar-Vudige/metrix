const mongoose = require('mongoose');

const userLoginSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firsttime: { type: Boolean, required: true },
});

const adminLoginSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const createProfileSchema = new mongoose.Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        title: { type: String, required: true },
        role: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phonenumber: { type: Number, required: true },
        experience: { type: Number, required: true },
        photo: { type: String },
        koreskills: { type: Array },
        otherskills: { type: Array },
        totalpercentage: { type: Number },
    })

const createProjectSchema = new mongoose.Schema(
    {
        projectname: { type: String, required: true },
        projectInformation: { type: String, required: true },
        projectClients: { type: String, required: true },
        endDate: { type: String, required: true },
        startDate: { type: String, required: true, unique: true },
        koreskills: { type: Array },
        otherskills: { type: Array },
        projectstatus: { type: String },
    }
)
const projectresource = new mongoose.Schema(
    {
        projectname: { type: String, required: true },
        email: { type: String, required: true },
        title: { type: String, required: true },
        percentage: { type: Number, required: true },
        endDate: { type: String, required: true },
        startDate: { type: String, required: true },
        projectInformation: { type: String, required: true },
        projectstatus:{ type: String, required: true },
        profilestatus:{ type: String, required: true },
    }
)
const UserLogin = mongoose.model('usersLoginDetails', userLoginSchema);
const AdminLogin = mongoose.model('adminLoginDetails', adminLoginSchema);
const CreateProfile = mongoose.model('Profiles', createProfileSchema);
const CreateProject = mongoose.model('Project', createProjectSchema);
const ProjectResource = mongoose.model('projectresources', projectresource);
module.exports = {
    UserLogin: UserLogin,
    AdminLogin: AdminLogin,
    CreateProfile: CreateProfile,
    CreateProject: CreateProject,
    ProjectResource: ProjectResource,
}