"use client"
import { getMyCloud } from '@/lib/helpers/actions/user.actions'
import { useAuth } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import { cloudproviders } from '@/lib/constants/cloudproviders';
import { CheckboxGroup } from '@nextui-org/react';
import { CustomCheckbox } from './CustomCheckBox';

interface Creds {
  accesskey: string,
  secretaccesskey: string
}

interface S3Credentials {
  cloudId: number,
  name: string,
  provider: string,
  credentials: Creds
}

export function MyCloud({ setGroupSelected }: { setGroupSelected: any }) {

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
      <div className="flex flex-col gap-1 w-full">
        <CheckboxGroup
          label="Select employees"
          orientation='horizontal'
          value={setGroupSelected((prev: any) => { return prev })}
          onChange={setGroupSelected}
          classNames={{
            base: "w-full"
          }}
        >
          {cloudproviders.map((cloud, index) => {
            // const cloudProvider = cloudproviders.find((provider) => provider.id === cloud.);
            const isActive = cloud.available ? "success" : "danger"
            return <>
              <CustomCheckbox
                key={index}
                value={cloud.name}
                statusColor={isActive}
                user={{
                  name: cloud.name,
                  avatar: cloud.image,
                  url: "https://twitter.com/jrgarciadev",
                  role: "Software Developer",
                  status: isActive == "success" ? "Active" : "Inactive",
                }}

              />
              {/* <img src={cloudProvider?.image}></img> */}
            </>
          })}
        </CheckboxGroup>
      </div>
    </div >
  )
}

export default MyCloud