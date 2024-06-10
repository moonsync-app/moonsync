// geolocation.ts
import { NextRequest } from "next/server";
import { geolocation } from "@vercel/edge";

export const getGeolocation = (request: NextRequest) => {
  const { country = "US", city = "NYC", region = "NY" } = geolocation(request);
  console.log(`Country: ${country}, City: ${city}, Region: ${region}`);
  return { country, city, region };
};
