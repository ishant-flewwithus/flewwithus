import Link from "next/link";
import styles from "./NotFound.module.css";

export default function pageNotFound() {
  return (
    <div className="center h-screen flex items-center justify-center">
      <div className="text-center">
      <h2 className="text-3xl">404 | Page Not Found</h2>
      <p>Go back to the <Link href="/flights" className="underline">homepage</Link></p>
    </div>
    </div>
  )
}
