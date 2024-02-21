"use client"
import React from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone';
import { CiSquarePlus } from 'react-icons/ci';
import { getSignedURL } from '../lib/helpers/actions/s3.actions';
import { useUser } from '@clerk/nextjs';
import { File } from 'buffer';
const Upload = () => {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone();
  const { isSignedIn, user, isLoaded } = useUser();


  const files = acceptedFiles.map((file: FileWithPath) => {
    // const arrayBuffer = Buffer.from(file.arrayBuffer());
    // const uint8Array = new Uint8Array(arrayBuffer);

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
        const resp = await fetch("http://localhost:3000/api/upload", {
          method: "POST",
          body: JSON.stringify({
            file: buffer,
            folder: username,
            fileName: (await file).name,
            fileType: (await file).type,
            fileSize: (await file).size
          })
        });
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