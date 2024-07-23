import Link from "next/link";

export default function pageNotFound() {
  return (  
    <div className="center h-screen flex items-center justify-center">
      <div className="text-center">
      <h2 className="text-3xl">404 | Page Not Found</h2>
      <p>Go back to the <Link href="/" className="underline">homepage</Link></p>
    </div>
    </div>
  )
}
  


