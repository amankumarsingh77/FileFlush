import { S3Client, PutObjectCommand, S3ClientConfig } from "@aws-sdk/client-s3";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const s3Client = new S3Client({
    region: 'auto',
    endpoint: process.env.NEXT_PUBLIC_AWS_ENDPOINT || '', // Make sure to handle undefined case
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '', // Make sure to handle undefined case
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '', // Make sure to handle undefined case
    }
});

async function uploadFileToS3(file: Buffer, fileName: string): Promise<string> {
    try {
        const params = {
            Bucket: 'YOUR_BUCKET_NAME',
            Key: fileName,
            Body: file,
        };
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        console.log(`File uploaded successfully to S3: ${fileName}`);
        return fileName;
    } catch (error) {
        console.error("Error uploading file to S3:", error);
        throw error;
    }
}
// type ResponseData = {
//     message?: string,
//     fileName?:string,
//     error?:string
// }
export const config = {
    api: {
        bodyParser: false,
    },
};


export default async function POST(req: Request, res:NextApiResponse) {
    try {
        const data  = req.body;
        // const id = await createItem(data)
        // const formData = await req.formData();
        console.log(data);
        

        // if (!file || !(file instanceof File)) { // Check if file exists and is an instance of File
        //     return res.json({ error: "File is required" });
        // }

        // const buffer = Buffer.from(await file.arrayBuffer());
        // const fileName = await uploadFileToS3(buffer, file.name);
        return res.json({ message: "success" });

    } catch (error) {
        console.error("Error:", error);
        return res.json({ error: "Unable to upload data" });
    }
}

// Ensure to export the route config for Edge runtime
