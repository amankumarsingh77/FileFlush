
import React from 'react'
import AddCloudCard from '@/components/addcloud/AddCloudCard';
import { CredentialCard } from '@/components/addcloud/CredentialCard';



const page = () => {

  return (

    <div className='flex '>
      {/* <h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 p-5'>Add Cloud</h1> */}
      <AddCloudCard  />
    </div>
  )
}

export default page