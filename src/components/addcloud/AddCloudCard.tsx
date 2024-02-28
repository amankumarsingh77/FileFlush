'use client'
import React, { useState } from "react";
import { Checkbox, Link, User, Chip, cn } from "@nextui-org/react";
import { signIn } from "next-auth/react"
import { cloudproviders } from "@/lib/constants/cloudproviders";
import { CredentialCard } from "./CredentialCard";
export default function AddCloudCard() {

  const [isSelected, setIsSelected] = React.useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isdialogopen, setisdialogopen] = React.useState(false);

        const handleAuthButtonClick = () => {
          setisdialogopen(true);
        };
  

  return (

    <div className="flex flex-wrap gap-6 p-3">
      {cloudproviders.map((provider) => {

        return (
          <div key={provider.id} className="w-96 rounded-lg flex justify-between gap-2 cursor-pointer p-2 bg-gray-200" onClick={handleAuthButtonClick}>
            <User avatarProps={{ size: "lg", src: provider.image }} name={provider.name} />
            <div className="flex flex-col items-end justify-center">
              {provider.available ? (
                <Chip color="success" size="sm" variant="flat">
                  available
                </Chip>
              ) : (
                <Chip color="danger" size="sm" variant="flat">
                  inactive
                </Chip>
              )}
            </div>
            {isdialogopen && <CredentialCard setisdialogopen={setisdialogopen} provider={provider}  />}
          </div>
        );
      })}
    </div>

  );
}
