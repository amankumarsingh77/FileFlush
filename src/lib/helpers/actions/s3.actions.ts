"use server"

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
    region: 'auto',
    endpoint: process.env.NEXT_PUBLIC_AWS_ENDPOINT || '', 
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '', 
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '', 
    }
});


export async function getSignedURL(filePath: string, folder: string) {
    // console.log(file);
    const PutObjctCommand = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: folder + "/" + filePath.replace(/^\/+/, "")
    });
    const signedUrl = await getSignedUrl(s3, PutObjctCommand, { expiresIn: 600 });
    return { signedUrl: signedUrl };
  }