"use client";

import StatsCard from "@/app/home/stats-card";
import { useEffect, useState } from "react";
import { BACKEND_HOST } from "@/app/utils/constants";

interface Data {
  mood_resp: string;
  nutrition_resp: string;
  exercise_resp: string;
}

function setWithExpiry(data: Data) {
  const now = new Date();
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0,
  );
  const item = {
    data: data,
    expiry: midnight.getTime(),
  };
  localStorage.setItem("statsData", JSON.stringify(item));
}

function getWithExpiry(key: string) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item;
}

export default function StatsComponent() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const storedData = getWithExpiry("statsData");

    if (storedData) {
      setData(storedData.data);
      return;
    }

    fetch(`${BACKEND_HOST}/api/dashboard`, {
      method: "POST",
      body: JSON.stringify({ key: "42" }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setWithExpiry(data);
        setData(data);
      });
  }, []);

  return (
    <div className="w-full mt-12 pb-8">
      <div className="grid sm:grid-cols-1 gap-10 md:grid-cols-1 lg:grid-cols-3 justify-items-center ">
        {data ? (
          <>
            <StatsCard title={"Energy"} details={data.mood_resp} />
            <StatsCard title={"Nourish"} details={data.nutrition_resp} />
            <StatsCard title={"Movement"} details={data.exercise_resp} />
          </>
        ) : (
          <>
            <StatsCard title={"Mood"} />
            <StatsCard title={"Nourish"} />
            <StatsCard title={"Movement"} />
          </>
        )}
      </div>
    </div>
  );
}
