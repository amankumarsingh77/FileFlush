import { MongoClient } from 'mongodb';
import axios from 'axios';
import queryString from 'query-string';
import { NextResponse } from 'next/server';
import User from '@/lib/helpers/database/models/user.model';
import { auth } from '@clerk/nextjs';
export async function GET(req:Request, res:Response) {
    const url = new URL(req.url);
    const code = new URLSearchParams(url.searchParams).get("code");
    const tokenUrl = 'https://api.dropboxapi.com/oauth2/token';
    const {userId} = auth();
    console.log("UserID", userId);
    

  try {
    const tokenResponse = await axios.post(tokenUrl, queryString.stringify({
      code,
      grant_type: 'authorization_code',
      client_id: process.env.DROPBOX_CLIENT_ID,
      client_secret: process.env.DROPBOX_CLIENT_SECRET,
      redirect_uri: process.env.DROPBOX_REDIRECT_URI,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = tokenResponse.data.access_token;
    
    // User.findOneAndUpdate(
    //     { _id: userId }, // or use another unique identifier like clerkId or username
    //     { $push: { cloudProviders: newCloudProvider } },
    //     { new: true, upsert: true } // options: return the updated document, create if not exists
    // ).then(updatedUser => {
    //     // success, do something with updatedUser
    //     console.log("Updated user:", updatedUser);
    // }).catch(error => {
    //     // handle error
    //     console.error("Error updating user:", error);
    // });
    // // Initialize MongoDB client and save the token
    // const client = new MongoClient(process.env.MONGODB_URI as string);
    // await client.connect();
    // const db = client.db('fileflush');
    // const collection = db.collection('users');
    // await collection.insertOne({ service: 'Dropbox', accessToken });

    return   NextResponse.redirect('http://localhost:3000/dashboard'); // Redirect to a success page or handle accordingly
  } catch (error) {
    console.error('Failed to exchange code for token', error);
    return   NextResponse.json({message:'Authentication failed'});
  }
}