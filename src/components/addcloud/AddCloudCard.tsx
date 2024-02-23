'use client'
import React, { useEffect } from "react";
import {Checkbox, Link, User, Chip, cn} from "@nextui-org/react";
import {signIn} from "next-auth/react"
export default function AddCloudCard() {


  const [isSelected, setIsSelected] = React.useState(false);

  const user = {
    name: "Google Drive",
    avatar: "/google_drive.png",
    username: "jrgarciadev",
    url: "https://twitter.com/jrgarciadev",
    // role: "Software Developer",
    status: "Active",
  }

  return (
    // <Checkbox       
    //   aria-label={user.name}
    //   classNames={{
    //     base: cn(
    //       "inline-flex w-full max-w-md bg-content1",
    //       "hover:bg-content2 items-center justify-start",
    //       "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
    //       "data-[selected=true]:border-primary",
    //     ),
    //     label: "w-full",
    //   }}
    //   isSelected={isSelected}
    //   onValueChange={setIsSelected}
    // >
      <div className="w-96 rounded-lg flex justify-between gap-2 cursor-pointer p-2 bg-gray-200" onClick={()=> signIn('google',{callbackUrl:"http://localhost:3000/dashboard"})}>
        <User
          avatarProps={{size: "lg", src: user.avatar}}
        //   description={
        //     <Link isExternal href={user.url} size="sm">
        //       {/* @{user.username} */}
        //     </Link>
        //   }
          name={user.name}
        />
        <div className="flex flex-col items-end justify-center">
          {/* <span className="text-tiny text-default-500">{user.role}</span> */}
          <Chip color="success" size="sm" variant="flat">
            {user.status}
          </Chip>
        </div>
      </div>
    // </Checkbox>
  );
}
