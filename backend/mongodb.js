const mongoose = require('mongoose');



async function connect() {
    try {
        const mongoURI = `mongodb+srv://sangameshwarvudige2001:07taH8nYd0x8O1dT@cluster0.onnah4l.mongodb.net/backend`;
        await mongoose.connect(mongoURI);
        console.log(`Connected to MongoDB at ${mongoURI}`);
    } catch (error) {
        console.error(`MongoDB connection error: ${error}`);
        throw error;
    }
}

async function addData(Model, data) {
    try {
        var store = Model(data)
        await store.save()
        console.log("data stored successfully")

    } catch (err) {
        console.log(err)
        throw err
    }
}
async function readData(Model, filter) {
    try {
        var data1 = await Model.find(filter)
        console.log("data read successfully")
        return data1
    }
    catch (err) {
        throw err
    }
}
async function updateData(Model, filter,updatedData) {
    try {
        const data = await Model.updateMany(filter, updatedData)
        console.log(data)

    }
    catch (err) {
        throw err
    }
}

async function deleteData(Model, filter) {
    try {
        const data = await Model.deleteMany(filter)
        console.log(data)

    }
    catch (err) {
        throw err
    }
}


async function disconnect() {
    await mongoose.disconnect();
    console.log("connection is closed")
}
module.exports={
    connect:connect,
    addData:addData,
    readData:readData,
    updateData:updateData,
    deleteData:deleteData,
    disconnect:disconnect,
}