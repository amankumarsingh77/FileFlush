// import { User } from "@clerk/nextjs/server"
import clientPromise from "@/app/helpers/mono";
import { NextApiRequest, NextApiResponse } from "next";

let client:any;
let db:any;
let  users:any;
interface User {
    name:String,
    clerk_id:String,
    uploads:String,
    CreatedAt:String
}

// async function init(){
//     if(db) return;
//     try{
//         client = await clientPromise;
//         db = await client.db();
        
//     }
// }

// export default function SignUp(req:NextApiRequest,res:NextApiResponse){
//     const {username, password} = req.body;
    
// }