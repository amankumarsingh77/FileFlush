import Headers from "../components/Headers"

const page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Headers />
      <div className="flex flex-col flex-grow justify-between items-center">
        <div>Upload</div>
        <div>File List</div>
      </div>
    </div>
  )
}

export default page