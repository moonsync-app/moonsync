'use client';

import { useEffect, useState } from 'react';


interface BiometricData {
  menstrual_phase: string;
  sleep: string;
  body_temperature: number;
  location: string;
  condition: string;
  temp_f: number;
}

export default function Header() {
  const [data, setData] = useState<BiometricData | null>(null);

  useEffect(() => {
    fetch('https://moonsync.app/api/biometrics', {
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
    <div className="text-center text-black">
      <h1 className="text-2xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-yellow-300 from-yellow-100">
          Good Morning,
        </span>{' '}
        Lisa.
      </h1>
      <br />
      {data ? (
        <>
          <h2 className="mb-2 text-2xl">
            {`Its a beautiful day in New York City 🗽. The current temperature `} 
            <span className='px-2 text-white bg-blue-600 rounded'>
            {`${data.temp_f}${'\u00b0'}F and ${data.condition.toLowerCase()} ⛅️.`}
            </span>
          </h2>
          <h2 className="mb-2 text-2xl">
            {`Looks like you got a `} 
            <span className='px-2 text-white bg-green-600 rounded'>great sleep 😴</span>
            <span>{`last night of ${data.sleep}.`}</span>
          </h2>
          <h2 className="mb-2 text-2xl">

            {`You are currently in your`} 
            <span className='px-2 text-white bg-yellow-300 rounded'>{`${data.menstrual_phase} phase`}</span>
            <span>{` and your average body temperature is ${data.body_temperature}${'\u00b0'}F 🌡️.`}</span>
          </h2>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
