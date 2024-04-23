import React, { useState } from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ weight: '400', subsets: ['latin'] });
const poppinsThin = Poppins({ weight: '200', subsets: ['latin'] });

const PerplexityComponent = () => {
  return (
    <div className="flex min-h-screen flex-col items-center gap-4 p-24 background-gradient">
      <h1 className={`text-4xl font-bold text-center ${poppins.className}`}>
        Understand Yourself Better
      </h1>
      <h2 className={`text-3xl mb-10 text-center ${poppinsThin.className}`}>
        Backed by your biometrics, science and other women like you ❤!
      </h2>
      <div className="mt-10 mb-4 rounded-lg w-3/4">
        <div className="rounded-t-lg dark:bg-gray-800">
          <textarea
            rows={4}
            id="comment"
            className={`w-full p-2 text-lg text-white border rounded-lg focus:outline-none bg-white backdrop-blur-lg bg-opacity-15 placeholder-gray-100 ${poppins.className}`}
            placeholder="Lisa, How can I help you today?"
            required
          ></textarea>
        </div>
        <div className="flex justify-end ml-2 mb-14">
          <button className="px-4 py-2 text-lg text-white rounded-full bg-white backdrop-blur-lg bg-opacity-15">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 w-full mb-4 rounded-xl text-lg border text-white bg-white backdrop-blur-lg bg-opacity-15 hover:cursor-pointer ${poppins.className}`}>
            {' '}
            🌱 Seed cycling for balanced hormones
          </div>
          <div className={`p-4 w-full mb-4 rounded-xl text-lg border text-white bg-white backdrop-blur-lg bg-opacity-15 hover:cursor-pointer ${poppins.className}`}>
            {' '}
            👩‍❤️‍👨 Best time next week for a date
          </div>
          <div className={`p-4 w-full mb-4 rounded-xl text-lg border text-white bg-white backdrop-blur-lg bg-opacity-15 hover:cursor-pointer ${poppins.className}`}>
            {' '}
            🏋️‍♀️ Suggested workouts for this week
          </div>
          <div className={`p-4 w-full mb-4 rounded-xl text-lg border text-white bg-white backdrop-blur-lg bg-opacity-15 hover:cursor-pointer ${poppins.className}`}>
            {' '}
            🧃 Improving feelings of low energy
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerplexityComponent;
