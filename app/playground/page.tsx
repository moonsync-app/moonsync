import React, { useState } from 'react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import MainInput from './main-input';
import SpeedDial from '../components/ui/speed-dial';

const poppins = Poppins({ weight: '600', subsets: ['latin'] });
const poppinsThin = Poppins({ weight: '200', subsets: ['latin'] });

const PerplexityComponent = () => {
  return (
    <div className="flex min-h-screen flex-col items-center gap-4 p-24 background-gradient ">
      <SpeedDial />
      <h1 className={`text-4xl font-bold text-center ${poppins.className}`}>
        Understand Yourself Better
      </h1>
      <h2 className={`text-3xl mb-10 text-center ${poppinsThin.className}`}>
        Backed by your biometrics, science and other women like you ❤!
      </h2>
      <div className="mt-10 mb-4 rounded-lg w-3/4">
        <MainInput />
        <div className="grid grid-cols-2 gap-4 font-bold">
          <Link
            href={{
              pathname: '/chat',
              query: { query: 'Seed cycling for balanced hormones' },
            }}
          >
            <div
              className={`p-4 w-full mb-4 rounded-xl text-lg border text-white bg-white backdrop-blur-lg bg-opacity-15 hover:cursor-pointer ${poppins.className}`}
            >
              {' '}
              🌱 Seed cycling for balanced hormones
            </div>
          </Link>

          <Link
            href={{
              pathname: '/chat',
              query: { query: 'Best time next week for a date' },
            }}
          >
            <div
              className={`p-4 w-full mb-4 rounded-xl text-lg border text-white bg-white backdrop-blur-lg bg-opacity-15 hover:cursor-pointer ${poppins.className}`}
            >
              {' '}
              👩‍❤️‍👨 Best time next week for a date
            </div>
          </Link>

          <Link
            href={{
              pathname: '/chat',
              query: { query: 'Suggested workout plan for this week' },
            }}
          >
            <div
              className={`p-4 w-full mb-4 rounded-xl text-lg border text-white bg-white backdrop-blur-lg bg-opacity-15 hover:cursor-pointer ${poppins.className}`}
            >
              {' '}
              🏋️‍♀️ Suggested workout plan for this week
            </div>
          </Link>

          <Link
            href={{
              pathname: '/chat',
              query: { query: 'Improving feelings of low energy' },
            }}
          >
            <div
              className={`p-4 w-full mb-4 rounded-xl text-lg border text-white bg-white backdrop-blur-lg bg-opacity-15 hover:cursor-pointer ${poppins.className}`}
            >
              {' '}
              🧃 Improving feelings of low energy
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PerplexityComponent;
