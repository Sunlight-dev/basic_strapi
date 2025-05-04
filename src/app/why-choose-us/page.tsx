"use client";
import { fetchWhyChooseUsData } from "@/utils/functions";
import { WhyChooseType } from "@/utils/types";
import Image from "next/image";
import { useEffect, useState } from "react";
// interface TabData {
//   id: string;
//   label: string;
//   title: string;
//   content: string;
//   image: string;
// }
const WhyChooseUs: React.FC = () => {
  //   const tabs: TabData[] = [
  //     {
  //       id: "industry-experts",
  //       label: "Industry Experts",
  //       title: "Industry Experts",
  //       content:
  //         "Our team comprises seasoned professionals with decades of combined experience across various industries. We bring specialized knowledge and insights to every project we undertake.",
  //       image: "/images/img_1.webp",
  //     },
  //     {
  //       id: "dedicated-team",
  //       label: "Dedicated Team",
  //       title: "Dedicated Team",
  //       content:
  //         "We assign a dedicated team to your project, ensuring consistent communication and personalized service throughout your journey with us.",
  //       image: "/images/img_1.webp",
  //     },
  //     {
  //       id: "outcome-focused",
  //       label: "Outcome Focused",
  //       title: "Outcome Focused",
  //       content:
  //         "We measure our success by your results. Our goal-oriented approach ensures that all strategies and recommendations are aligned with your business objectives.",
  //       image: "/images/img_1.webp",
  //     },
  //     {
  //       id: "high-quality-service",
  //       label: "High Quality Service",
  //       title: "High Quality Service",
  //       content:
  //         "We are committed to delivering exceptional service and maintaining the highest standards in all aspects of our work, from initial consultation to final implementation.",
  //       image: "/images/img_1.webp",
  //     },
  //     {
  //       id: "cyber-security-expert",
  //       label: "Cyber Security Expert",
  //       title: "Cyber Security Expert",
  //       content:
  //         "Our specialized cyber security team helps protect your business from emerging threats with cutting-edge technologies and proven security protocols.",
  //       image: "/images/img_1.webp",
  //     },
  //   ];
  const [activeTab, setActiveTab] = useState("");
  const [whyChooseUsData, setWhyChooseUsData] =
    useState<WhyChooseType | null>();
  useEffect(() => {
    const fetchAndSetData = async () => {
      const processedData: WhyChooseType | null =
        (await fetchWhyChooseUsData()) || null;
      if (!processedData) {
        throw new Error("Failed to fetch service list");
      }
      setWhyChooseUsData(processedData);
      setActiveTab(processedData.advantages[0].id);
    };
    fetchAndSetData();
  }, []);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };
  if (!whyChooseUsData?.advantages) return;
  const activeTabData = whyChooseUsData?.advantages.find(
    (adv) => adv.id === activeTab
  );
  return (
    <section
      id="why-us"
      className="bg-white w-screen h-screen flex items-center justify-center"
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium text-gray-800 mb-2">
            Why Choose Us
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {whyChooseUsData?.title}
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {whyChooseUsData?.description}
          </p>
        </div>
        {activeTab && (
          <div className="flex flex-col lg:flex-row items-center mt-12 justify-center">
            <div className="w-[60%] flex relative">
              <div className="bg-[#A15573] z-10 w-[50%] aspect-square bg-opacity-80 rounded-full flex flex-col justify-center text-white p-8 transform transition-transform duration-500 opacity-80">
                <h3 className="text-2xl text-left font-semibold mb-3 px-2">
                  {activeTabData?.title}
                </h3>
                <p className="text-center">{activeTabData?.description}</p>
              </div>
              <Image
                width={400}
                priority
                height={400}
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${activeTabData?.img}`}
                alt={activeTabData?.title || ""}
                className="w-[50%] aspect-square rounded-full object-cover translate-x-[-100px] opacity-80"
              />
            </div>
            <div className="w-[40%] flex flex-col gap-4">
              {whyChooseUsData?.advantages.map((adv) => (
                <button
                  key={adv.id}
                  onClick={() => handleTabClick(adv.id)}
                  className={`text-left py-4 pl-4 pr-8 rounded-full text-lg flex justify-between font-bold items-center transition-all duration-300 ${
                    activeTab === adv.id
                      ? "bg-[#A15573] text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-500"
                  }`}
                >
                  &lt;
                  <span className="font-medium">{adv.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyChooseUs;
