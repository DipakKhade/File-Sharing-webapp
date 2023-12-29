import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
  filename: {
    type: String,
    // required: true,
  },
  path: {
    type: String,
    // required: true,
  },
  size: {
    type: String,
    // required: true,
  },
  uuid: {
    type: String,
    // required: true,
  },
  sender: {
    type: String,
  },
  receiver: {
    type: String,
  },
},{timestamps:true});

const Files= mongoose.model("File",fileSchema)
export default Files