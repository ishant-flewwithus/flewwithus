import Page from "@/components/app/Page";
import Image from "next/image";

export default function page() {
  return (
    <Page headerChild={
      <div>
        <div className="text-center text-5xl text-onprimary mt-10 mb-5 font-bold ">
        Flewwithus <span className="font-light">Privacy Policy</span>
      </div>
      <div className="text-center font-light text-lg text-onprimary mb-5">
        Wednesday, 3 Januray 2024
      </div>
      </div>
    } overlapChildrenOverHeader={true}>
        
        <div className="text-center text-red-600 mt-24">
        This privacy policy does not apply in the United States of America. The US privacy policy is available at <span className="underline cursor-pointer text-black">Privacy policy</span>
        </div>
        <div className="flex justify-center">
            <Image src={"/privacy_policy_3.png"} width={1200} height={500} alt="about us logo"></Image>
        </div>

        <div className="flex justify-center">
          
        </div>
        <div className="flex h-auto w-full bg-white rounded-2xl">
          <div className="flex w-full h-auto my-3 mx-9   justify-between">
            <div className="h-full w-full">
              <div className="text-3xl mt-4">
              About this policy
              </div>
              <div className="py-5">
              Along with our Cookie Policy and Terms of Service, this Privacy Policy (the “Policy”) explains how we collect and handle your information across all of the Skyscanner services, including the mobile app and the Skyscanner website, and other services such as our customer service or user research channels (together, the “Platforms”). We&apos;ll review this from time to time to make sure it&apos;s up-to-date and post the latest version here. When we make significant changes, we&apos;ll let you know when you next access our services, or by other communications.
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-auto w-full bg-white rounded-2xl">
          <div className="flex w-full h-auto my-3 mx-9   justify-between">
            <div className="h-full w-full">
              <div className="text-3xl mt-4">
              What personal data do we collect and where does it come from?
              </div>
              <div className="py-5">
              Without information we can&apos;t help you to plan and book your dream trip or make our Platforms and other services the best they can be. So, when you use our Platforms or otherwise interact with us, we collect, use, store and share some personal data.
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-auto w-full bg-white rounded-2xl">
          <div className="flex w-full h-auto my-3 mx-9   justify-between">
            <div className="h-full w-full">
              <div className="text-3xl mt-4">
              Why and how do we use personal data?
              </div>
              <div className="py-5">
              We only use your personal data where: <br />
                • Necessary for us to perform a contract with you, or facilitate a contract between you and a Travel Provider;<br />
                • Necessary to pursue our or other&apos;s legitimate interests;<br />
                • Necessary to exercise legal rights or comply with legal obligations; or<br />
                • You&apos;ve given us your consent.
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-auto w-full bg-white rounded-2xl">
          <div className="flex w-full h-auto my-3 mx-9   justify-between">
            <div className="h-full w-full">
              <div className="text-3xl mt-4">
              When is personal data shared with or collected by third parties?
              </div>
              <div className="py-5">
              We share personal data where necessary for the purposes described in How and why do we use personal data? This means we share personal data where you ask us to, where it&apos;s a necessary part of doing business with you and providing you with services, where we need to for legal reasons, or where sharing information is necessary to pursue our, or a third party&apos;s, legitimate interests.
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-auto w-full bg-white rounded-2xl">
          <div className="flex w-full h-auto my-3 mx-9   justify-between">
            <div className="h-full w-full">
              <div className="text-3xl mt-4">
              Where do we process personal data?
              </div>
              <div className="py-5">
              Personal data is securely stored in data centres around the world - the exact location depends on where you are when you use Skyscanner. Personal data will only be processed by suppliers who provide appropriate contractual safeguards for the information they process. Sometimes personal data may be stored in countries with different levels of security to your own but we always make sure their standards meet ours.
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-auto w-full bg-white rounded-2xl">
          <div className="flex w-full h-auto my-3 mx-9   justify-between">
            <div className="h-full w-full">
              <div className="text-3xl mt-4">
              How is personal data used for advertising?
              </div>
              <div className="py-5">
              You’ll see adverts when you use our Platforms and might also see adverts about Skyscanner and selected Skyscanner partners when you’re on other platforms. These adverts will come from us or from third parties and may be personalized to make them more relevant to you. The personal data used to personalize adverts may include information you’ve provided to us by creating an account or making a booking via the Skyscanner Platforms, or through cookies and similar technologies (you can find out more in our <span className="underline cursor-pointer">Cookie Policy</span>).

              </div>
            </div>
          </div>
        </div>

        <div className="flex h-auto w-full bg-white rounded-2xl">
          <div className="flex w-full h-auto my-3 mx-9   justify-between">
            <div className="h-full w-full">
              <div className="text-3xl mt-4">
              Do we use cookies or similar technologies?
              </div>
              <div className="py-5">
              We use cookies and similar technologies to help deliver and optimise our Platforms, improve your experience and for advertising purposes, depending on whether you are using our website or app and your privacy settings. <br />
              Please see our <span className="underline cursor-pointer">Cookie Policy</span> for more information and details on the types of cookies and similar technologies we use.
              </div>
            </div>
          </div>
        </div>
    </Page>
  )
}
