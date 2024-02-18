"use server"

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const s3 = new S3Client({
    region: 'auto',
    endpoint: process.env.NEXT_PUBLIC_AWS_ENDPOINT || '', // Make sure to handle undefined case
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '', // Make sure to handle undefined case
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '', // Make sure to handle undefined case
    }
});


export async function getSignedURL(fileName:string, folder:string){
    

    const PutObjctCommand = new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key: folder+"/"+fileName,
    }) 

    const signedUrl = await getSignedUrl(s3,PutObjctCommand,{expiresIn:600})
    return {signedUrl:signedUrl}

}