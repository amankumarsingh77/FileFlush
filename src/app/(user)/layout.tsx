import SideBar from '@/components/SideBar'
import React, { ReactNode } from 'react'

const layout = ({children}:{children:ReactNode}) => {
  return (
    <div className="flex h-screen w-full ">
            <SideBar />
        <div className="flex flex-col w-full h-full ">
            {children}
        </div>
    </div>
  )
}

export default layout