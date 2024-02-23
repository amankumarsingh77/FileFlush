
import { MdDashboard } from "react-icons/md"
import Headers from "../../components/Headers"
import SideBar, { SideBarItems } from "../../components/SideBar"
import Upload from "../../components/Upload"
import { CiMoneyCheck1 } from "react-icons/ci"
import { currentUser } from "@clerk/nextjs"
import { IoCloudUploadOutline } from "react-icons/io5"

const page = () => {

  return (
    <div>
      {/* <Headers /> */}

      <main className="min-h-screen flex flex-row">
        <div className="">
        </div>

        <div className="flex flex-col flex-grow justify-between items-center">
          <div className="w-[60%] py-20">
            <Upload />
          </div>

          <div>File List</div>
        </div>
      </main>
    </div>

  )
}

export default page