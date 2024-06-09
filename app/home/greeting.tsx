"use client";

import { useUser } from "@clerk/nextjs";

export const Greeting = () => {
  const { user } = useUser();
  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return (
    <h1 className="text-2xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
      <span className="text-transparent bg-clip-text bg-gradient-to-r to-yellow-300 from-yellow-100">
        {greeting},
      </span>{" "}
      {user && user.firstName}
    </h1>
  );
};
