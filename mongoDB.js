import mongoose from "mongoose";
import { config } from 'dotenv';
config();

const connectToMongoDB=()=>{
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log('connected to mongoDB')
    } catch (error) {
        console.log(error)
    }
}

export default connectToMongoDB;