import Link from "next/link";
import styles from "./NotFound.module.css";

export default function pageNotFound() {
  return (
    // <div className="center h-screen flex items-center justify-center">
    //   <div className="text-center">
    //   <h2 className="text-3xl">404 | Page Not Found</h2>
    //   <p>Go back to the <Link href="/flights" className="underline">homepage</Link></p>
    // </div>
    // </div>
    <div className="w-screen h-screen flex flex-col justify-center items-center space-y-5">
      <h1 className="text-6xl text-blue-900 font-bold">404</h1>
      <h3 className="text-3xl font-medium">Page not found</h3>
      <p>The URL of the page was not found. Please try again</p>
      <div className="flex space-x-2">
        <button className="p-2 bg-blue-900 text-white rounded-md"><Link href="/flights">Go Home</Link></button>
      </div>
    </div>
  )
}
