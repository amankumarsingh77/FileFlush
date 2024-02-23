
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
      providerName: {
        type: String,
        enum: ['AWS S3', 'Google Drive', 'DropBox','OneDrive','Cloudflare R2','Wasabi','PCloud'],
        required: true
      },
      loginDetails: {
        type:Object,
        required:true// Add other necessary fields such as projectId, credentials file path, etc.
      }
    }
  ]
});

const User = models?.User || model("User", UserSchema);

export default User;