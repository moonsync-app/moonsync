'use client';

import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppins = Poppins({ weight: '400', subsets: ['latin'] });
import { useState } from 'react';

export default function MainInput() {
  const [query, setQuery] = useState('');

  return (
    <>
      <div className="rounded-t-lg dark:bg-gray-800">
        <textarea
          rows={4}
          id="comment"
          className={`w-full p-2 text-lg text-white border rounded-lg focus:outline-none bg-white backdrop-blur-lg bg-opacity-15 placeholder-gray-100 ${poppins.className}`}
          placeholder="Lisa, How can I help you today?"
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></textarea>
      </div>
      <div className="flex justify-end ml-2 mb-14">
        <Link
          href={{
            pathname: '/chat',
            query: { query },
          }}
        >
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
        </Link>
      </div>
    </>
  );
}
