"use server"

import { S3Client, CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from 'fs';

const s3 = new S3Client({
    region: 'auto',
    endpoint: process.env.NEXT_PUBLIC_AWS_ENDPOINT || '', 
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '', 
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '', 
    }
});

export async function getSignedURL(filePath: string, folder: string, fileSize:number) {
    const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key: folder + "/" + filePath.replace(/^\/+/, "")
    };
    console.log("file",filePath);
    

    // Create a multipart upload
    const createMultipartUploadCommand = new CreateMultipartUploadCommand(params);
    const uploadIdResponse = await s3.send(createMultipartUploadCommand);
    const uploadId = uploadIdResponse.UploadId;

    // Get a signed URL for each part
    const signedUrls: string[] = [];
    const parts: { [partNumber: number]: string } = {};
    const chunkSize = 5 * 1024 * 1024; // 5MB per part
    const numParts = Math.ceil(fileSize / chunkSize);

    for (let partNumber = 1; partNumber <= numParts; partNumber++) {
        const uploadPartCommand = new UploadPartCommand({
            ...params,
            UploadId: uploadId,
            PartNumber: partNumber,
            Body: fs.createReadStream(filePath, {
                start: (partNumber - 1) * chunkSize,
                end: Math.min(partNumber * chunkSize, fileSize) - 1
            }),
            ContentLength: Math.min(chunkSize, fileSize - (partNumber - 1) * chunkSize)
        });
        const signedUrl = await getSignedUrl(s3, uploadPartCommand, { expiresIn: 600 });
        signedUrls.push(signedUrl);
        parts[partNumber] = signedUrl;
    }

    // Return signed URLs and part numbers
    return { signedUrls: signedUrls, parts: parts, uploadId: uploadId };
}

// Call this function with the filePath and folder where filePath is the path to the file to be uploaded.
// Example: getSignedURL("/path/to/file.txt", "uploads");
