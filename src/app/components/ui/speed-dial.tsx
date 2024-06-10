"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { GithubIcon, LogOutIcon, MenuIcon } from "lucide-react";

export default function SpeedDial() {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const { signOut } = useClerk();
  const router = useRouter();

  const onClickHander = () => {
    console.log("clicked");
    setIsOpened(!isOpened);
  };

  const handleSignOutClick = () => {
    signOut(() => router.push("/sign-in"));
  };

  return (
    <div data-dial-init className="fixed top-28 md:top-16 start-7 group">
      <button
        type="button"
        data-dial-toggle="speed-dial-menu-top-left"
        aria-controls="speed-dial-menu-top-left"
        aria-expanded="false"
        onClick={onClickHander}
        className={`flex items-center justify-center text-white rounded-full w-8 h-8 md:w-14 md:h-14 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800`}
      >
        <MenuIcon size="large" />
      </button>
      <div
        id="speed-dial-menu-top-left"
        className="flex flex-col items-center mt-4 space-y-2"
      >
        <Link href={"/"}>
          <button
            type="button"
            data-tooltip-target="tooltip-share"
            data-tooltip-placement="left"
            className={`transition ease-in delay-150 flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400 ${isOpened ? "visible opacity-100" : "invisible opacity-0"} `}
          >
            <Image
              src={"/moon.png"}
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

        <Link href={"/playground"}>
          <button
            type="button"
            data-tooltip-target="tooltip-print"
            data-tooltip-placement="left"
            className={`transition ease-in delay-150 flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400 ${isOpened ? "visible opacity-100" : "invisible opacity-0"} `}
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

        <Link href={"https://github.com/moonsync-app"}>
          <button
            type="button"
            data-tooltip-target="tooltip-print"
            data-tooltip-placement="left"
            className={`transition ease-in delay-150 flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400 ${isOpened ? "visible opacity-100" : "invisible opacity-0"} `}
          >
            <GithubIcon />
          </button>
        </Link>

        <button
          onClick={handleSignOutClick}
          type="button"
          data-tooltip-target="tooltip-print"
          data-tooltip-placement="left"
          className={`transition ease-in delay-150 flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400 ${isOpened ? "visible opacity-100" : "invisible opacity-0"} `}
        >
          <LogOutIcon />
        </button>
      </div>
    </div>
  );
}
