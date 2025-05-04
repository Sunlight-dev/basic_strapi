"use client";
import { fetchWhyChooseUsData } from "@/utils/functions";
import { WhyChooseType } from "@/utils/types";
import Image from "next/image";
import { useEffect, useState } from "react";
const WhyChooseUs: React.FC = () => {
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
  return (
    <section
      id="why-us"
      className="bg-white flex items-center justify-center py-20 lg:w-screen lg:h-screen"
    >
      <div className="max-w-[1366px] px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium text-gray-800 mb-2">
            Why Choose Us
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {whyChooseUsData?.title}
          </h3>
          <p className="text-lg text-gray-600 w-[90%] mx-auto">
            {whyChooseUsData?.description}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 items-center mt-12 justify-center">
          {whyChooseUsData.advantages.map((item, index) => (
            <div
              className={`lg:w-[60%] w-[80%] flex relative translate-x-[50px] lg:translate-x-0 ${
                item.id !== activeTab && "hidden"
              }`}
              key={index}
            >
              <div className="bg-[#A15573] z-10 w-[50%] aspect-square bg-opacity-80 rounded-full flex flex-col justify-center text-white p-8 transform transition-transform duration-500 opacity-80">
                <h3 className="text-2xl text-left font-semibold mb-3 px-2">
                  {item?.title}
                </h3>
                <p className="text-center">{item?.description}</p>
              </div>
              <Image
                width={400}
                height={400}
                loading="eager"
                priority
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item?.img}`}
                alt={item?.title || ""}
                className="w-[50%] aspect-square rounded-full object-cover translate-x-[-100px] opacity-80"
              />
            </div>
          ))}
          <div className="lg:w-[40%] w-[80%] flex flex-col gap-6">
            {whyChooseUsData?.advantages.map((adv) => (
              <button
                key={adv.id}
                onClick={() => handleTabClick(adv.id)}
                className={`h-full text-left py-4 pl-4 pr-8 rounded-full text-lg flex justify-between font-bold items-center transition-all duration-300 ${
                  activeTab === adv.id
                    ? "bg-[#A15573] text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-[#A15573]/30"
                }`}
              >
                &lt;
                <span className="font-medium">{adv.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
