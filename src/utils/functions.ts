import qs from "qs";
import { Advantage, JsonDataType, WhyChooseType } from "./types";

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  try {
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api${path}${
      queryString ? `?${queryString}` : ""
    }`;
    const response = await fetch(requestUrl, mergedOptions);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error(
      `Please check if your server is running and you set all the required tokens.`
    );
  }
}

export async function fetchWhyChooseUsData() {
  try {
    const path = "/why-choose-uses";
    const urlParamsObject = {
      fields: ["title", "simple_description"],
      populate: ["advantages.img"],
    };
    const responseData = await fetchAPI(path, urlParamsObject, "");
    const tempRawData: JsonDataType[] = responseData.data;
    if (!responseData.data) return null;
    const processedData = transformData(tempRawData[0]);
    return processedData;
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error("Failed to fetch data");
    console.error("Error fetching services:", error);
  }
}

export function transformData(data: JsonDataType): WhyChooseType {
  return {
    title: data.title,
    description: data.simple_description,
    advantages: data.advantages.map((adv: Advantage) => ({
      id: adv.id.toString(),
      title: adv.title,
      description: adv.description,
      img: adv.img.url,
    })),
  };
}
