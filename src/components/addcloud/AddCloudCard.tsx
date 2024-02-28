'use client'
import React, { useEffect } from "react";
import { Checkbox, Link, User, Chip, cn } from "@nextui-org/react";
import { signIn } from "next-auth/react"
import { cloudproviders } from "@/lib/constants/cloudproviders";
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

    <div className="flex flex-wrap gap-6 p-3">
      {cloudproviders.map((provider) => {
        return (
          <div key={provider.id} className="w-96 rounded-lg flex justify-between gap-2 cursor-pointer p-2 bg-gray-200" onClick={() => signIn('google', { callbackUrl: "http://localhost:3000/dashboard" })}>
            <User
              avatarProps={{ size: "lg", src: provider.image }}

              name={provider.name}
            />
            <div className="flex flex-col items-end justify-center">
              {provider.available ?
                (
                  <Chip color="success" size="sm" variant="flat">
                    available
                  </Chip>
                ) : (
                  <Chip color="danger" size="sm" variant="flat">
                    inactive
                  </Chip>
                )}

            </div>

          </div>
        )
      })}

    </div>

  );
}
