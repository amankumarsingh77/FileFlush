import { useUser } from "@clerk/nextjs";
import { CiMoneyCheck1 } from "react-icons/ci";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";

export const  navitems = [
    {
        icon:MdDashboard,
        text:"Dashboard",
        route:"/dashboard",
        active:false
    },
    {
        icon:CiMoneyCheck1,
        text:"Pricing",
        route:'/pricing',
        active:false
    },
    {
        icon:IoCloudUploadOutline,
        text:"AddCloud",
        route:'/addcloud',
        active:false
    }
]

// export const user= {isSignedIn: useUser().isSignedIn, userDetails:useUser().user};
