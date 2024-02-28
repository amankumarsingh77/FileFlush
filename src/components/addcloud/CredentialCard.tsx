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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Provider{
    id:Number,
    name:String,
    image:String,
    available:Boolean,
    staus:String,
    authType:String,
    credParams:Array<String>

}

export function CredentialCard({setisdialogopen, provider}:{setisdialogopen:any, provider:any}) {
    // const [isOpen, setIsOpen] = React.useState(false);
    // setIsOpen((prev:boolean)=>console.log(prev)
    // )
    console.log(provider);
    

    const handleButtonClick = () => {
        setisdialogopen((prevIsOpen:boolean) => !prevIsOpen);
      };
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center  bg-opacity-30 backdrop-blur-sm z-50">
          <Card className="w-[350px] h-[350px] bg-white rounded-lg p-4">
            <CardHeader>
              <CardTitle>Add {}</CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>   
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                    {/* {provider.credParams.map((cred:string)=>{ */}
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Namw</Label>
                        <Input id="name" placeholder="Name of your project" />
                      </div>
                    {/* })} */}
                  

                  {/* <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Framework</Label>
                    <Select>
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                      </SelectContent>
                    </Select>
                  </div> */}
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleButtonClick}>
                Close
              </Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        </div>
    )
}
