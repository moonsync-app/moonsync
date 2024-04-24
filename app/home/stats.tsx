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

export default function StatsComponent() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch('https://moonsync.app/api/dashboard', {
      method: 'POST',
      body: JSON.stringify({ key: '42' }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    console.log('Data : ', data);
  }, [data]);

  return (
    <div className="absolute inset-x-0 bottom-0 w-full mb-2">
      <div className="grid grid-cols-3 justify-items-center ">
        {data ? (
          <>
            <StatsCard
              svgIllustration={MoodImage}
              title={'Mood'}
              details={data.mood_resp}
            />
            <StatsCard
              svgIllustration={DietImage}
              title={'Nourish'}
              details={data.nutrition_resp}
            />
            <StatsCard
              svgIllustration={WorkoutImage}
              title={'Movement'}
              details={data.exercise_resp}
            />
          </>
        ) : (
          <>
            <StatsCard
              svgIllustration={MoodImage}
              title={'Mood'}
              details={null}
            />
            <StatsCard
              svgIllustration={DietImage}
              title={'Nourish'}
              details={null}
            />
            <StatsCard
              svgIllustration={WorkoutImage}
              title={'Movement'}
              details={null}
            />
          </>
        )}
      </div>
    </div>
  );
}
