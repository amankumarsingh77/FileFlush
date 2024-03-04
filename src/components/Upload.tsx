"use client"
import React, { useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone';
import { CiSquarePlus } from 'react-icons/ci';
import { getSignedURL } from '../lib/helpers/actions/s3.actions';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import {Upload} from '@aws-sdk/lib-storage';
import { S3Client } from '@aws-sdk/client-s3';

const UploadComponent = () => {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone();
  const { isSignedIn, user, isLoaded } = useUser();
  const [progress, setProgress] = useState(0);


  const files = acceptedFiles.map((file: FileWithPath) => {

    return {
      path: file.path,
      size: file.size,
      name: file.name,
      type: file.type,
      data: file.arrayBuffer()
    };
  });

  const upload = async () => {
    const username = user?.username ?? '';


    if (files) {
      for (const file of files) {
        const buffer = Buffer.from(await file.data);
        console.log(buffer);
        
        
      const  target = {Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME, Key: file.name, Body:buffer, ContentType: file.type};
      try{
        const parallelUploads3 = new Upload({
          client: new S3Client({region: 'auto',
          endpoint: process.env.NEXT_PUBLIC_AWS_ENDPOINT || '',
          apiVersion:"2012-08-10",
          credentials: {
              accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '', 
              secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '', 
          }}),
          leavePartsOnError: false,
          params: target,
          queueSize: 4, // optional concurrency configuration
          partSize: 1024 * 1024 * 5,
        });
        parallelUploads3.on("httpUploadProgress", (progress) => {
          console.log(progress);
        });
        await parallelUploads3.done();
      }
      catch(error){
        console.log(error);
        
      }
      
      // for (const file of files) {
        
      //   const signedUrlResponse = await getSignedURL(file.path || "", username, file.size);
      //   const parts = signedUrlResponse.parts;
      //   const uploadId = signedUrlResponse.uploadId;

      //   for (const [partNumber, signedUrl] of Object.entries(parts)) {
      //     const data = await file.data;

      //     await axios.put(signedUrl, data, {
      //       headers: {
      //         "Content-Type": file.type || "application/octet-stream",
      //       },
      //       onUploadProgress: (progressEvent) => {
      //         const total = progressEvent.total ?? 1;
      //         const percentCompleted = Math.round((progressEvent.loaded * 100) / total);
      //         setProgress(percentCompleted);
      //       }
      //     });

      //     console.log(`Part ${partNumber} uploaded successfully`);
      //   }

        // Complete multipart upload
        // Add logic here to complete multipart upload using uploadId
      }
    }
  };


  return (
    <div>
      <div  {...getRootProps({ className: 'dropzone' })} className='flex w-full h-52 justify-center items-center bg-gray-100 rounded-lg shadow-inset shadow-inner cursor-pointer hover:border-dashed border hover:border-[#6366F1]'>
        <input {...getInputProps()} />
        <CiSquarePlus color='#9191f0' size='35px' className='p-1' />
        {isDragActive ? (
          <p className='text-sm'>Drag the file here...</p>
        ) : (
          <p className='text-sm max-sm:hidden'>Drag and drop or click to upload</p>
        )}

      </div>
      <aside>
        <h4>Files</h4>
        {files.map((file) => {
          return (
            <ul key={file.name}>{file.path}{file.size}</ul>

          )
        })}
        <button onClick={upload}>Upload</button>
        {/* <ul>{files[0]}</ul> */}
      </aside>
    </div>


  )
}

export default UploadComponent;