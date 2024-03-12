"use client"
import { getUserFiles } from '@/lib/helpers/actions/s3.actions';
import { ListObjectsV2Output } from '@aws-sdk/client-s3';
import { useUser } from '@clerk/nextjs';
import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const ListUserFiles = () => {
    const { isSignedIn, user, isLoaded } = useUser();
    const [userfiles, setuserfiles] = useState<Object[]>([])

    useEffect(() => {
        if (isSignedIn && isLoaded) {
            getUserFiles(user?.username || "")
                .then(files => setuserfiles(files))
                .catch(error => console.error("Error fetching user files:", error));
        }
    }, [isSignedIn, isLoaded, user]);
    console.log(userfiles);


    return (
        <div className=''>
            <Table>
                <TableCaption>Recently Uploaded Files</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">File Name</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead className="text-right">LastModified</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {userfiles !== null && userfiles.map((file: any, index) => {
                        const size: string = (file.Size / 1024).toFixed(2) + "KB";
                        const date: string = file.LastModified?.getDate() + "/" + file.LastModified?.getMonth() + "/" + file.LastModified?.getFullYear();
                        return (
                            <TableRow className='' key={index}>
                                <TableCell className="font-medium">{file.Key}</TableCell>
                                <TableCell>{size}</TableCell>
                                {/* <TableCell>Credit Card</TableCell> */}
                                <TableCell className="text-right">{date}</TableCell>
                            </TableRow>
                        )
                    })}


                </TableBody>
            </Table>

        </div>
    );
};

export default ListUserFiles;
