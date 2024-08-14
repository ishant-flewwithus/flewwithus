import Page from "@/components/app/Page";

export default function privacySettings() {
  return (
    <Page
      headerChild={
        <div className="my-10 text-center text-5xl font-bold text-onprimary">
          Privacy <span className="font-light">Settings</span>
        </div>
      }
      overlapChildrenOverHeader={true}
    >
      <div className="mt-24 flex justify-center">
        <div className="text-3xl font-bold">Manage your preferences</div>
      </div>
      <div className="flex h-auto w-full rounded-2xl bg-white">
        <div className="mx-9 my-3 flex h-auto w-full justify-between">
          <div className="h-full w-full">
            <div className="text-3xl">Essential cookies</div>
            <div>These make our website work and can&apos;t be turned off.</div>
          </div>
          <div className="flex h-full w-2/4 items-center justify-end pr-10 text-green-400">
            ALWAYS ON
          </div>
        </div>
      </div>

      <div className="flex h-auto w-full rounded-2xl bg-white">
        <div className="mx-9 my-3 flex h-auto w-full justify-between">
          <div className="h-full w-full">
            <div className="text-3xl">Improved experience</div>
            <div>We use these to test, improve and develop features.</div>
          </div>
          <div className="flex h-full w-2/4 items-center justify-end pr-10 text-green-400">
            <label
              htmlFor="check_improved_experience"
              className="relative h-7 w-14 cursor-pointer rounded-full border-2 border-black bg-white"
            >
              <input
                type="checkbox"
                id="check_improved_experience"
                className="peer sr-only"
              />
              <span className="absolute left-1 top-[3px] h-4/5 w-2/5 rounded-full bg-rose-600 transition-all duration-500 peer-checked:left-7 peer-checked:bg-green-500"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex h-auto w-full rounded-2xl bg-white">
        <div className="mx-9 my-3 flex h-auto w-full justify-between">
          <div className="h-full w-full">
            <div className="text-3xl">Advertising and related technologies</div>
            <div>
              We show adverts provided by ourselves and third parties. We
              collect information on how you use Skyscanner, which includes
              personal data such as your IP address. This is used to improve
              your experience, store and/or access information on a device,
              personalised advertising, advertising measurement, audience reach
              and services development.
            </div>
          </div>
          <div className="ml-5 flex h-full w-1/4 items-center justify-end pr-10 text-green-400">
            <label
              htmlFor="check_advertising"
              className="relative h-7 w-14 cursor-pointer rounded-full border-2 border-black bg-white"
            >
              <input
                type="checkbox"
                id="check_advertising"
                className="peer sr-only"
              />
              <span className="absolute left-1 top-[3px] h-4/5 w-2/5 rounded-full bg-rose-600 transition-all duration-500 peer-checked:left-7 peer-checked:bg-green-500"></span>
            </label>
          </div>
        </div>
      </div>
    </Page>
  );
}
