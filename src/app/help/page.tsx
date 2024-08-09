import Page from "@/components/app/Page";

export default function privacySettings() {
  return (
    <Page headerChild={
      <div className="flex flex-col justify-center items-center">
        <div className="text-center text-5xl text-onprimary my-10 font-light ">
        What can we <span className="font-bold">help you</span> with today?
        </div>
      <div className="h-12 w-full flex flex-row gap-5 px-72">
        <div className="w-full h-full bg-white rounded-full cursor-pointer">

        </div>
        <div className="h-full w-1/3 bg-primary-500 rounded-full border-2 border-white cursor-pointer flex justify-center items-center text-onprimary text-xl">
        Search
        </div>
      </div>
      </div>
    } overlapChildrenOverHeader={true}>
        <div className="flex justify-center mt-24">
          <div className="text-3xl">
            Browse articles by topic
          </div>
        </div>
        
    </Page>
  );
}
