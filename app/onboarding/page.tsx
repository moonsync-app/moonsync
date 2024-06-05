"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "./_actions";
import { HOME_PATH } from "../utils/constants";

export default function OnboardingComponent() {
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    // if otherTracker is not empty, then add it to the trackers array
    // and then remove from formData
    if (formData.get("otherTracker")) {
      formData.append(
        "trackers",
        formData.get("otherTracker") as string,
      );
      formData.delete("otherTracker");
    }

    await completeOnboarding(formData);
    await user?.reload();
    router.push(HOME_PATH);
  };

  return (
    <div className="px-8 py-12 sm:py-16 md:px-20">
      <div className="mx-auto bg-white overflow-hidden rounded-lg shadow-lg max-w-sm">
        <div className="p-8">
          <h3 className="text-xl font-semibold text-gray-900">
            Welcome to the journey :)
          </h3>
        </div>
        <form action={handleSubmit}>
          <div className="space-y-4 px-8 pb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Do you wear any wearables or cycle trackers?
              </label>
              <div className="mt-1">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="wearables"
                    value="Yes"
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    name="wearables"
                    value="No"
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Which wearable/cycle tracker?
              </label>
              <div className="mt-1 space-y-2">
                {[
                  "N/A",
                  "Apple Watch",
                  "Oura Ring",
                  "Garmin",
                  "Fitbit",
                  "Samsung Galaxy Watch",
                  "Clue",
                  "Fitr",
                  "Apple Health",
                ].map((tracker) => (
                  <label key={tracker} className="block">
                    <input
                      type="checkbox"
                      name="trackers"
                      value={tracker}
                      className="form-checkbox"
                    />
                    <span className="ml-2">{tracker}</span>
                  </label>
                ))}
                <div className="flex items-center space-x-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="trackers"
                      value="Other"
                      className="form-checkbox"
                    />
                    <span className="ml-2">Other:</span>
                  </label>
                  <input
                    type="text"
                    name="otherTracker"
                    placeholder="Please specify"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 py-4 bg-gray-50">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
