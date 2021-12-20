const mongoose = require("mongoose");

const database = "mongodb://localhost:27017/SochVichar";

const connectDB = () => {
    try {
        mongoose.connect(database, { useNewUrlParser: true });
        console.log('mongobd connected');
    }
    catch (err) {
        console.log(err.message)
    }
}
module.exports = connectDB;
