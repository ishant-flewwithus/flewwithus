
import Page from "@/components/app/Page";
import Image from "next/image";

export default function page() {
  return (
    <Page headerChild={
      <div className="text-center text-5xl text-onprimary my-10 font-bold ">
        Privacy Policy
      </div>
    } overlapChildrenOverHeader={true}>
        <div className="flex justify-center mt-24">
          <div className="text-3xl font-bold">
            Manage your preferences
          </div>
        </div>
        <div className="flex h-auto w-full bg-white rounded-2xl">
          <div className="flex w-full h-auto my-3 mx-9   justify-between">
            <div className="h-full w-full">
              <div className="text-3xl">
              Essential cookies
              </div>
              <div>
                These make our website work and can&apos;t be turned off.
              </div>
            </div>
            <div className="h-full w-2/4  text-green-400 flex items-center justify-end pr-10">
              ALWAYS ON
            </div>
          </div>
        </div>
        <div className="flex h-auto w-full bg-white rounded-2xl">
          <div className="flex w-full h-auto my-3 mx-9   justify-between">
            <div className="h-full w-full">
              <div className="text-3xl">
              Improved experience
              </div>
              <div>
                We use these to test, improve and develop features.
              </div>
            </div>
            <div className="h-full w-2/4 text-green-400 flex items-center justify-end pr-10">
            <label htmlFor="check" className="bg-white w-14 h-7 relative rounded-full border-2 border-black cursor-pointer">
              <input type="checkbox" id="check" className="sr-only peer"/>
              <span className="w-2/5 h-4/5 bg-rose-600 absolute rounded-full left-1 top-[3px] peer-checked:bg-green-500 peer-checked:left-7 transition-all duration-500"></span>
            </label>
            </div>
          </div>
        </div>
        
    </Page>
  )
}
