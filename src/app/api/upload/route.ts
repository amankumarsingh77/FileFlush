import { S3Client, PutObjectCommand, S3ClientConfig } from "@aws-sdk/client-s3";
// import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

import { NextResponse } from "next/server";

const s3Client = new S3Client({
    region: 'auto',
    endpoint: process.env.NEXT_PUBLIC_AWS_ENDPOINT || '', 
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '', 
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '', 
    }
});

async function uploadFileToS3(file: Buffer, folder: string, filePath: string, fileType: string, size: number) {
    try {
        const params = {
            Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
            Key: folder + "/" + filePath.replace(/^\/+/, ""),
            Body: file,
            ContentType: fileType,
            ContentLength: size 
        };
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        console.log(`File uploaded successfully to S3: ${filePath}`);
        return filePath;
    } catch (error) {
        console.error("Error uploading file to S3:", error);
        throw error;
    }
}





export async function POST(req: Request, res:Response) {
    try {
        const { file, folder, filePath, fileType,fileSize }: { file: Buffer, folder: string, filePath: string, fileType:string, fileSize:number } = await req.json();
        const resp = await uploadFileToS3(file,folder, filePath,fileType, fileSize );
        return NextResponse.json({ message: "success:"} );

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Unable to upload data" });
    }
}
