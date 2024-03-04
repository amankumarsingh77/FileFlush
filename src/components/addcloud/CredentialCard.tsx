"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@clerk/nextjs"
import { addCloud } from "@/lib/helpers/actions/user.actions"

interface S3Credentials {
  accesskey: string,
  secretaccesskey: string
}


export function CredentialCard({ setisdialogopen, provider }: { setisdialogopen: any, provider: Provider }) {
  const [accesskey, setaccesskey] = React.useState("")
  const [secretaccesskey, setsecretaccesskey] = React.useState("")
  const { userId } = useAuth();

  const addcloud = async () => {
    if (userId) {
      const data: S3Credentials = {
        accesskey,
        secretaccesskey
      }
      const addcloudresp = await addCloud(userId, data)
      console.log(addcloudresp);

    }


  }

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setisdialogopen((prevIsOpen: boolean) => !prevIsOpen);
  };
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center  bg-opacity-30 backdrop-blur-sm z-50">
        <Card className="w-[350px] h-[350px] bg-white rounded-lg p-4">
          <CardHeader>
            <CardTitle>Add {provider.name}</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">accessKey</Label>
                  <Input id="access" onChange={(e) => setaccesskey(e.target.value)} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">accessSecret</Label>
                  <Input id="secret" onChange={(e) => setsecretaccesskey(e.target.value)} />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleButtonClick}>
              Close
            </Button>
            <Button onClick={addcloud}>Add</Button>
          </CardFooter>
        </Card>
      </div >
      <div className={`fixed top-0 left-0 w-full h-full z-40 ${setisdialogopen ? 'block' : 'hidden'}`}></div>
    </>
  )

}
