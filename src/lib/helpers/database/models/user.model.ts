
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
      cloudId:{
        type:Number,
        required:true
      },
      name:{
        type:String,
        required:true
      },
      provider: {
        type: String,
        required: true,
      },
      credentials: {
        accesskey: {
          type: String,
          required: true,
        },
        secretaccesskey: {
          type: String,
          required: true,
        }
      }
    }
  ]
});

const User = models?.User || model("User", UserSchema);

export default User;