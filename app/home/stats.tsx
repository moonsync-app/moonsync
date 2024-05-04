'use client';

import StatsCard from './stats-card';
import MoodImage from './mood.svg';
import WorkoutImage from './workout2.svg';
import DietImage from './food.svg';
import React, { use, useEffect, useState } from 'react';

interface Data {
  mood_resp: string;
  nutrition_resp: string;
  exercise_resp: string;
}

function setWithExpiry(data: Data) {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  const item = {
    data: data,
    expiry: midnight.getTime()
  };
  localStorage.setItem("statsData", JSON.stringify(item));
}

function getWithExpiry(key) {
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

const backendHost = process.env.NEXT_PUBLIC_BACKEND_HOST;

export default function StatsComponent() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const storedData = getWithExpiry('statsData');

    if (storedData) {
      setData(storedData.data);
      return;
    }

    fetch(`${backendHost}/api/dashboard`, {
      method: 'POST',
      body: JSON.stringify({ key: '42' }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        setWithExpiry(data);
        setData(data);
      });
  }, []);


  return (
    <div className="w-full mt-12 pb-8">
      {/* <div className="absolute inset-x-0 bottom-0 w-full mb-2"> */}
      <div className="grid sm:grid-cols-1 gap-10 md:grid-cols-1 lg:grid-cols-3 justify-items-center ">
        {data ? (
          <>
            <StatsCard
            /*  svgIllustration={MoodImage} */
              title={'Skills'}
              details={data.mood_resp}
            />
            <StatsCard
           /*   svgIllustration={DietImage} */
              title={'Nourish'}
              details={data.nutrition_resp}
            />
            <StatsCard
            /*  svgIllustration={WorkoutImage} */
              title={'Movement'}
              details={data.exercise_resp}
            />
          </>
        ) : (
          <>
            <StatsCard
            /*  svgIllustration={MoodImage} */
              title={'Mood'}
              details={null}
            />
            <StatsCard
           /*   svgIllustration={DietImage} */
              title={'Nourish'}
              details={null}
            />
            <StatsCard
           /*   svgIllustration={WorkoutImage} */
              title={'Movement'}
              details={null}
            />
          </>
        )}
      </div>
    </div>
  );
}
