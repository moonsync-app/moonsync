'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function SpeedDial() {
  const [isOpened, setIsOpened] = useState<Boolean>(false);

  const onClickHander = () => {
    console.log('clicked');
    setIsOpened(!isOpened);
  };

  return (
    <div data-dial-init className="fixed top-5 start-5 group">
      <button
        type="button"
        data-dial-toggle="speed-dial-menu-top-left"
        aria-controls="speed-dial-menu-top-left"
        aria-expanded="false"
        onClick={onClickHander}
        className={`flex items-center justify-center text-white rounded-full w-8 h-8 md:w-14 md:h-14 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800`}
      >
        <svg
          width="120px"
          height="120px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {' '}
            <path
              d="M4 7L7 7M20 7L11 7"
              stroke="#ffffff"
              stroke-width="1.5"
              stroke-linecap="round"
            ></path>{' '}
            <path
              d="M20 17H17M4 17L13 17"
              stroke="#ffffff"
              stroke-width="1.5"
              stroke-linecap="round"
            ></path>{' '}
            <path
              d="M4 12H7L20 12"
              stroke="#ffffff"
              stroke-width="1.5"
              stroke-linecap="round"
            ></path>{' '}
          </g>
        </svg>
        <span className="sr-only">Open actions menu</span>
      </button>
      <div
        id="speed-dial-menu-top-left"
        className="flex flex-col items-center mt-4 space-y-2"
      >
        <Link href={'/'}>
          <button
            type="button"
            data-tooltip-target="tooltip-share"
            data-tooltip-placement="left"
            className={`transition ease-in delay-150 flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400 ${isOpened ? 'visible opacity-100' : 'invisible opacity-0'} `}
          >
            <Image
              src={'/moon.png'}
              width={28}
              height={28}
              alt="MoonSync Logo"
            />
            {/* <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
              />
            </svg> */}
            <span className="sr-only">Share</span>
          </button>
        </Link>

        <Link href={'/playground'}>
          <button
            type="button"
            data-tooltip-target="tooltip-print"
            data-tooltip-placement="left"
            className={`transition ease-in delay-150 flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400 ${isOpened ? 'visible opacity-100' : 'invisible opacity-0'} `}
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
              />
            </svg>
          </button>
        </Link>

        <Link href={'https://github.com/moonsync-app'}>
          <button
            type="button"
            data-tooltip-target="tooltip-print"
            data-tooltip-placement="left"
            className={`transition ease-in delay-150 flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400 ${isOpened ? 'visible opacity-100' : 'invisible opacity-0'} `}
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}
