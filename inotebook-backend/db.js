import mongoose from "mongoose";

// const mongoURI = "mongodb://127.0.0.1:27017/iNotebookdb";
const mongoURI = process.env.MONGODB_URI;
const connectToMongo = () => {
    mongoose
        .connect(mongoURI)
        .then((val) => {
            console.log("Connected to Mongo Successfully");
        })
        .catch((err) => {
            console.log(err.message);
        });
};

export default connectToMongo;
