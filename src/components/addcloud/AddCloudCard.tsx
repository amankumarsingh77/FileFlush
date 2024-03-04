import React, { useState } from "react";
import { User, Chip } from "@nextui-org/react";
import { cloudproviders } from "@/lib/constants/cloudproviders";
import { CredentialCard } from "./CredentialCard";

interface ProviderStates {
  [key: string]: boolean;
}

export default function AddCloudCard() {
  const [providerStates, setProviderStates] = useState<ProviderStates>({});
  const handleAuthButtonClick = (providerId: number) => {
    setProviderStates(prevState => ({
      ...prevState,
      [providerId]: true
    }));
  };

  return (
    <div className="flex flex-wrap gap-6 p-3">
      {cloudproviders.map((provider) => {
        const isDialogOpen = providerStates[provider.id] || false;
        return (
          <div key={provider.id} className="w-96 rounded-lg flex justify-between gap-2 cursor-pointer p-2 bg-gray-200" onClick={() => handleAuthButtonClick(provider.id)}>
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
            {isDialogOpen && <CredentialCard setisdialogopen={setProviderStates} provider={provider} />}
          </div>
        );
      })}
    </div>
  );
}
