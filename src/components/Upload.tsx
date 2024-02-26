"use client"
import React, { useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone';
import { CiSquarePlus } from 'react-icons/ci';
import { getSignedURL } from '../lib/helpers/actions/s3.actions';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';

const Upload = () => {
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
        const signedUrl = await getSignedURL(file.path || "", username)
        const url = signedUrl.signedUrl
        const data = await (file).data
        await axios.put(url,data,{
          headers: {
            "Content-Type": file?.type || "application/octet-stream",
          },
          onUploadProgress: (progressEvent) => {
            const total = progressEvent.total ?? 1;
            const percentCompleted = Math.round((progressEvent.loaded * 100) / total);
            setProgress(percentCompleted);
            console.log(percentCompleted); // Handle the progress event as needed
          }
        })
        console.log("uploaded successfully");
        
        // const buffer = Buffer.from(await file.data);
        // const resp = await fetch("/api/upload", {
        //   method: "POST",
        //   body: JSON.stringify({
        //     file: buffer,
        //     folder: username,
        //     filePath: (await file).path,
        //     fileType: (await file).type,
        //     fileSize: (await file).size
        //   })
        // });
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

export default Upload;