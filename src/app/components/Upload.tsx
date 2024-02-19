"use client"
import React from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone';
import { CiSquarePlus } from 'react-icons/ci';
import { getSignedURL } from '../helpers/create/actions';
import { useUser } from '@clerk/nextjs';

const Upload = () => {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone();
  const { isSignedIn, user, isLoaded } = useUser();
  const files = acceptedFiles.map((file:FileWithPath) => ({
    path: file.path,
    size: file.size,
    name: file.name,
    type: file.type
  }));
  const upload = async () => {
     // If file.path is undefined, set it to an empty string
    const username = user?.username ?? '';
    if(files){
      files.map(async (file)=>{
        const filePath = file.path ?? '';
        const { signedUrl } = await getSignedURL(filePath?.replace(/\//g, ""), username);

        fetch(signedUrl,{
          method:"PUT",
          body:JSON.stringify(file),
          headers:{
            "Content-Type":file.type
          }
      })
      })
      

      
    }
  }
  
  return (
    <div>
      <div  {...getRootProps({className: 'dropzone'})} className='flex w-full h-52 justify-center items-center bg-gray-100 rounded-lg shadow-inset shadow-inner cursor-pointer hover:border-dashed border hover:border-[#6366F1]'>
      <input {...getInputProps()} />
      <CiSquarePlus color='#9191f0' size='35px' className='p-1'/>
      {isDragActive?(
        <p className='text-sm'>Drag the file here...</p>
      ):(
        <p className='text-sm max-sm:hidden'>Drag and drop or click to upload</p>
      )}
      
    </div>
      <aside>
        <h4>Files</h4>
        {files.map((file)=>{
          return(
            <ul>{file.path}{file.size}</ul>
            
          )
        })}
        <button onClick={upload}>Upload</button>
        {/* <ul>{files[0]}</ul> */}
      </aside>
    </div>
    
    
  )
}

export default Upload;