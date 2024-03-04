"use client"
import { getMyCloud } from '@/lib/helpers/actions/user.actions'
import {  useAuth } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import { cloudproviders } from '@/lib/constants/cloudproviders';

interface Creds{
  accesskey: string,
  secretaccesskey: string
}

interface S3Credentials {
  cloudId:number,
  name:string,
  provider:string,
  credentials: Creds
}

export function  MyCloud ()  {

    const { userId } = useAuth();
    const [myCloud, setMyCloud] = useState<S3Credentials[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                const cloudData = await getMyCloud(userId);
                setMyCloud(await cloudData.cloudProviders);
            }
        };
        fetchData();
    }, [userId]);
    console.log(myCloud);
    
    
    
  return (
    <div>
      {myCloud.map((cloud)=>{
        const cloudProvider = cloudproviders.find((provider)=>provider.id === cloud.cloudId);
        
        return <>
            {/* <img src={cloudProvider?.image}></img> */}
        </>
      })}
    </div>
  )
}

export default MyCloud