import { S3Client, PutObjectCommand, S3ClientConfig } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
    region: 'auto',
    endpoint: process.env.NEXT_PUBLIC_AWS_ENDPOINT || '', // Make sure to handle undefined case
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '', // Make sure to handle undefined case
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '', // Make sure to handle undefined case
    }
});

async function uploadFileToS3(file: Buffer,folder:string, fileName: string): Promise<string> {
    try {
        const params = {
            Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
            Key: folder+"/"+fileName,
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


export default async function POST(req: Request, res:Response) {
    try {
        const {file,folder,fileName}  =await req.json();
        // const id = await createItem(data)
        // const formData = await req.formData();
        console.log("Body"+file,folder,fileName);
        

        // if (!file || !(file instanceof File)) { // Check if file exists and is an instance of File
        //     return res.json({ error: "File is required" });
        // }

        // const buffer = Buffer.from(await file.arrayBuffer());
        // const resp = await uploadFileToS3(buffer,folder, fileName);
        return NextResponse.json({ message: "success:"} );

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Unable to upload data" });
    }
}

// Ensure to export the route config for Edge runtime