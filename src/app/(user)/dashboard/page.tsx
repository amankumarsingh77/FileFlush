
import { MdDashboard } from "react-icons/md"
import Headers from "../../../components/Headers"
import SideBar, { SideBarItems } from "../../../components/SideBar"
import UploadComponent from "@/components/dashboard/Upload"
import { CiMoneyCheck1 } from "react-icons/ci"
import { currentUser } from "@clerk/nextjs"
import { IoCloudUploadOutline } from "react-icons/io5"
import MyCloud from "@/components/dashboard/MyCloud"

const page = () => {

  return (
    <div>
      <main className="min-h-screen flex flex-row ">
        <div className="flex flex-col flex-grow justify-between items-center ">
          <div className="w-[70%] ">
            <UploadComponent />
          </div>
        </div>
      </main>
    </div>

  )
}

export default page