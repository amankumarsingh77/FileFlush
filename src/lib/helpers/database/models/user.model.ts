
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  planId: {
    type: Number,
    default: 1,
  },
  files: [{
    fileName: {
      type: String,
      required: true
    },
    fileTye:{
      type:String,
      required: true
    },
    createdAt:{
      type:Date,
      default:Date.now()
    }
  }],
  cloudProviders:[
    {
      id:{
        type:Number,
        required:true
      },
      cloudName: {
        type: String,
        required: true,
      },
      credentials: {
        accessKey:{
          type:String,
          required:true
        },
        secretAccessKey:{
          type:String,
          required:true
        }
      }
    }
  ]
});

const User = models?.User || model("User", UserSchema);

export default User;