
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongodb = require("./mongodb.js")
const schemas = require("./schema.js")
const logics = require("./logics.js")




const PORT = process.env.PORT || 8000;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', async (req, res) => {
    res.send("Hello")
});

app.get('/signup', async (req, res) => {
    req.query.firsttime = false;

    try {
        await mongodb.connect()
        await mongodb.addData(schemas.UserLogin, req.query)
        res.send("true")
    }
    catch (err) {

        if (err.code === 11000 || err.code === 11001)
            res.send("You already registered. please login")

        else
            res.send("Something went Wrong!")
    }
    // finally {
    //     await mongodb.disconnect()
    // }
});

app.get('/login', async (req, res) => {


    try {
        await mongodb.connect()
        var data1 = await mongodb.readData(schemas.UserLogin, { email: req.query.email })
        if (data1.length === 0 || data1[0].password !== req.query.password) {

            res.send('Invalid Crendentials')
            return
        }
        res.send(data1[0].firsttime)
    }
    catch (err) {

        res.send("Something went wrong!")
    }
    // finally {
    //     await mongodb.disconnect()
    // }
});

app.get('/adminlogin', async (req, res) => {


    try {
        await mongodb.connect()
        var data1 = await mongodb.readData(schemas.AdminLogin, { email: req.query.email })
        if (data1.length === 0 || data1[0].password !== req.query.password) {

            res.send('Invalid Crendentials')
            return
        }
        res.send(true)
    }
    catch (err) {

        res.send("Something went wrong!")
    }
    // finally {
    //     await mongodb.disconnect()
    // }
});


app.post('/createprofile', async (req, res) => {
    console.log(req.body)
    req.body.totalpercentage = 0;
    req.body.koreskills = logics.koreskills_logic(req.body.koreskills)
    req.body.otherskills = logics.otherskills_logic(req.body.otherskills)

    try {
        await mongodb.connect()
        await mongodb.addData(schemas.CreateProfile, req.body)
        await mongodb.updateData(schemas.UserLogin, { email: req.body.email }, { firsttime: true })
        res.send(true)
    }
    catch (err) {

        res.send("Something went wrong!")
    }
    // finally {
    //     await mongodb.disconnect()
    // }
});
app.post('/updateprofile', async (req, res) => {

    req.body.koreskills = logics.koreskills_logic(req.body.koreskills)
    req.body.otherskills = logics.otherskills_logic(req.body.otherskills)

    try {
        await mongodb.connect()
        await mongodb.updateData(schemas.CreateProfile, { email: req.body.email }, req.body)
        res.send(true)
    }
    catch (err) {

        res.send("Something went wrong!")
    }
    // finally {
    //     await mongodb.disconnect()
    // }
});


app.get('/getprofile', async (req, res) => {


    try {
        await mongodb.connect()
        var data
        if (req.query.email === undefined)
            data = await mongodb.readData(schemas.CreateProfile, {})
        else
            data = await mongodb.readData(schemas.CreateProfile, { email: req.query.email })
        res.send(data)
    }
    catch (err) {
        console.log(err)
        res.send("Something went wrong!")
    }
    // finally {
    //     await mongodb.disconnect()
    // }
});


app.post('/createproject', async (req, res) => {
    console.log(req.body)
    req.body.projectstatus = "ongoing";

    req.body.koreskills = logics.koreskills_logic(req.body.koreskills)
    req.body.otherskills = logics.otherskills_logic(req.body.otherskills)

    try {
        await mongodb.connect()
        await mongodb.addData(schemas.CreateProject, req.body)
        res.send(true)
    }
    catch (err) {

        res.send("Something went wrong!")
    }
    // finally {
    //     await mongodb.disconnect()
    // }
});

app.get('/getprojects', async (req, res) => {


    try {
        await mongodb.connect()
        var data
        if (req.query.projectname === undefined)
            data = await mongodb.readData(schemas.CreateProject, {})
        else
            data = await mongodb.readData(schemas.CreateProject, { projectname: req.query.projectname })

        res.send(data)
    }
    catch (err) {

        res.send("Something went wrong!")
    }
    // finally {
    //     await mongodb.disconnect()
    // }
});
app.post('/updateproject', async (req, res) => {
    console.log(req.body)

    req.body.koreskills = logics.koreskills_logic(req.body.koreskills)
    req.body.otherskills = logics.otherskills_logic(req.body.otherskills)

    try {
        await mongodb.connect()
        await mongodb.updateData(schemas.CreateProject, { projectname: req.body.projectname }, req.body)
        res.send(true)
    }
    catch (err) {

        res.send("Something went wrong!")
    }
    // finally {
    //     await mongodb.disconnect()
    // }
});

app.get('/deleteproject', async (req, res) => {


    try {
        await mongodb.connect()
        await mongodb.deleteData(schemas.CreateProject, { projectname: req.query.projectname })
        await mongodb.deleteData(schemas.ProjectResource, { projectname: req.query.projectname })
        res.send(true)
    }
    catch (err) {

        res.send("Something went wrong!")
    }
    // finally {
    //     await mongodb.disconnect()
    // }
});

app.post('/createprojectresources', async (req, res) => {

    console.log(req.body)
    if (req.body.projectstatus === "released")
        req.body.profilestatus = "released"
    else
        req.body.profilestatus = "ongoing"
    try {
        await mongodb.connect()

        await mongodb.addData(schemas.ProjectResource, req.body)
        await mongodb.updateData(schemas.CreateProfile, { email: req.body.email }, { $inc: { totalpercentage: parseInt(req.body.percentage) } })
        res.send(true)

    }
    catch (err) {

        res.send("Something went wrong!")
    }
    // finally {
    //     await mongodb.disconnect()
    // }
});
app.get('/getprojectresources', async (req, res) => {


    try {
        await mongodb.connect()
        var data;
        if (req.query.projectname !== undefined)
            data = await mongodb.readData(schemas.ProjectResource, { projectname: req.query.projectname })
        else
            data = await mongodb.readData(schemas.ProjectResource, { email: req.query.email })
        res.send(data)

    }
    catch (err) {

        res.send("Something went wrong!")
    }
    // finally {
    //     await mongodb.disconnect()
    // }
});

app.post('/updateprojectresources', async (req, res) => {

    console.log(req.body)
    
    try {
        await mongodb.connect()

        await mongodb.updateData(schemas.ProjectResource, { email: req.body.email,projectname:req.body.projectname }, {...req.body})
        res.send(true)

    }
    catch (err) {

        res.send("Something went wrong!")
    }
    finally {
        await mongodb.disconnect()
    }
});
app.get("/updatestatus", async (req, res) => {
    console.log(req.query)

    try {
        await mongodb.connect()

        await mongodb.updateData(schemas.ProjectResource, { projectname:req.query.projectname },{projectstatus:req.query.projectstatus,profilestatus:req.query.projectstatus==="released"?"released":'ongoing'})
        await mongodb.updateData(schemas.CreateProject, { projectname:req.query.projectname }, {projectstatus:req.query.projectstatus})
        res.send("true")

    }
    catch (err) {

        res.send("Something went wrong!")
    }
    // finally {
    //     await mongodb.disconnect()
    // }
});


app.get('/deleteprojectresources', async (req, res) => {
    console.log(req.query)

    try {
        await mongodb.connect()

        await mongodb.deleteData(schemas.ProjectResource, { email: req.query.email,projectname:req.query.projectname })
        await mongodb.updateData(schemas.CreateProfile, { email: req.query.email }, { $inc: { totalpercentage: parseInt(req.query.percentage) * -1 } })
        res.send("true")

    }
    catch (err) {

        res.send("Something went wrong!")
    }
    // finally {
    //     await mongodb.disconnect()
    // }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});