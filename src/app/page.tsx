import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Headers from "./components/Headers";
import Features from "./components/Features";
import Statistics from "./components/Statistics";
import Link from "next/link";

export default function Home() {
  // const getdata = async () => {
  //   const data = await fetch("https://fakestoreapi.com/products/1")
  //   console.log(await data.json());
  // }
  // getdata()

  return (
    <div>
      <Headers />
      <main className="flex min-h-screen flex-col">

        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col" >
            <div className="text-center lg:w-2/3 w-full">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Sync your data to your favourite cloud Providers</h1>
              <p className="mb-8 leading-relaxed">Introducing FileFlush, your hassle-free solution for seamless file synchronization across multiple cloud platforms. With FileFlush, users can upload their files just once, and our advanced synchronization technology ensures that those files are instantly mirrored across their chosen cloud providers.</p>
              <div className="flex justify-center" >
                <Link href="/dashboard" className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Upload</Link>
                <Link href='/addcloud' className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Add Cloud</Link>
              </div>
            </div>
          </div>
        </section>
        <div>
          <Features />
        </div>
        <div className=" h-full">
          <Statistics />
        </div>
      </main>
    </div>
  );
}
