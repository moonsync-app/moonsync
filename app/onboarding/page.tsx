"use client";

import { FormEvent } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { completeOnboarding } from "@/app/onboarding/_actions";
import { HOME_PATH } from "@/app/utils/constants";

export default function OnboardingComponent() {
  const { user } = useUser();
  const router = useRouter();

  const [showTrackers, setShowTrackers] = useState(false);
  const [fullCycleLengthUnknown, setFullCycleLengthUnknown] = useState(false);
  const [periodLengthUnknown, setPeriodLengthUnknown] = useState(false);
  const [lastPeriodUnknown, setLastPeriodUnknown] = useState(false);
  const [showBirthControlType, setShowBirthControlType] = useState(false);
  const [lastPeriodDates, setLastPeriodDates] = useState([""]);

  const handleWearablesUsageChange = (event: FormEvent<HTMLInputElement>) => {
    setShowTrackers(event.currentTarget.value === "Yes");
  };

  const handleFullCycleLengthChange = (event: FormEvent<HTMLInputElement>) => {
    setFullCycleLengthUnknown(event.currentTarget.checked);
  };

  const handlePeriodLengthChange = (event: FormEvent<HTMLInputElement>) => {
    setPeriodLengthUnknown(event.currentTarget.checked);
  };

  const handleLastPeriodChange = (event: FormEvent<HTMLInputElement>) => {
    setLastPeriodUnknown(event.currentTarget.checked);
  };

  const handleBirthControlChange = (event: FormEvent<HTMLInputElement>) => {
    setShowBirthControlType(event.currentTarget.value === "Yes");
  };

  const handleSubmit = async (formData: FormData) => {
    // if otherTracker is not empty, then add it to the trackers array
    // and then remove from formData
    if (formData.get("otherTracker")) {
      formData.append("trackers", formData.get("otherTracker") as string);
      formData.delete("otherTracker");
    }

    await completeOnboarding(formData);
    await user?.reload();
    router.push(HOME_PATH);
  };

  const addLastPeriodDate = () => {
    if (lastPeriodDates.length < 12) {
      setLastPeriodDates([...lastPeriodDates, ""]);
    }
  };

  const handleDateChange = (index: number, value: string) => {
    const updatedDates = [...lastPeriodDates];
    updatedDates[index] = value;
    setLastPeriodDates(updatedDates);
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
                Name
              </label>
              <input
                type="text"
                name="name"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Wearables/Menstrual Tracker Usage
                </label>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="wearablesUsage"
                      value="Yes"
                      className="form-radio"
                      required
                      onChange={handleWearablesUsageChange}
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="wearablesUsage"
                      value="No"
                      className="form-radio"
                      required
                      onChange={handleWearablesUsageChange}
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              {showTrackers && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Which wearables/menstrual trackers do you use?
                  </label>
                  <div className="mt-1 space-y-2">
                    {[
                      "Oura Ring",
                      "Garmin Watch",
                      "Apple Watch",
                      "Samsung Watch",
                      "FitBit",
                      "Whoop",
                      "Clue",
                      "Flo",
                      "Ovia",
                      "Others",
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
                          value="Others"
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
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Full length of your cycle (in days)
              </label>
              <input
                type="number"
                name="fullCycleLength"
                min="20"
                max="60"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                disabled={fullCycleLengthUnknown}
              />
              <div className="mt-2 text-sm">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="fullCycleLength"
                    value=""
                    className="form-checkbox"
                    onChange={handleFullCycleLengthChange}
                  />
                  <span className="ml-2">I don&apos;t know</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Period length (in days)
              </label>
              <input
                type="number"
                name="periodLength"
                min="1"
                max="30"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                disabled={periodLengthUnknown}
              />
              <div className="mt-2 text-sm">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="periodLength"
                    value=""
                    className="form-checkbox"
                    onChange={handlePeriodLengthChange}
                  />
                  <span className="ml-2">I don&apos;t know</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Select all the days of your last period
              </label>
              {lastPeriodDates.map((date, index) => (
                <input
                  key={index}
                  type="date"
                  name="lastPeriodDays"
                  value={date}
                  onChange={(e) => handleDateChange(index, e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required={!lastPeriodUnknown && index === 0}
                  disabled={lastPeriodUnknown}
                />
              ))}
              {lastPeriodDates.length < 12 && (
                <button
                  type="button"
                  onClick={addLastPeriodDate}
                  className="mt-2 text-blue-500"
                >
                  + Add another date
                </button>
              )}
              <div className="mt-2 text-sm">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="lastPeriodUnknown"
                    value=""
                    className="form-checkbox"
                    onChange={handleLastPeriodChange}
                  />
                  <span className="ml-2">I don&apos;t know</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Check all that apply to you
              </label>
              <div className="mt-1 space-y-2">
                {[
                  "I am a working professional",
                  "I am an athlete",
                  "I have a hormonal condition",
                  "I am undergoing peri-menopause",
                  "I am undergoing menopause",
                  "I am generally interested in my health",
                ].map((condition) => (
                  <label key={condition} className="block">
                    <input
                      type="checkbox"
                      name="conditions"
                      value={condition}
                      className="form-checkbox"
                    />
                    <span className="ml-2">{condition}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Tell us more
              </label>
              <div className="mt-1 space-y-2">
                {[
                  "PCOS",
                  "endometriosis",
                  "fibroids",
                  "IBS",
                  "ovarian cysts",
                ].map((condition) => (
                  <label key={condition} className="block">
                    <input
                      type="checkbox"
                      name="moreConditions"
                      value={condition}
                      className="form-checkbox"
                    />
                    <span className="ml-2">{condition}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Do you take birth control?
                </label>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="birthControl"
                      value="Yes"
                      className="form-radio"
                      required
                      onChange={handleBirthControlChange}
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="birthControl"
                      value="No"
                      className="form-radio"
                      required
                      onChange={handleBirthControlChange}
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              {showBirthControlType && (
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    What type?
                  </label>
                  <select
                    id="birthControlType"
                    name="birthControlType"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="Hormonal">Hormonal</option>
                    <option value="Non-Hormonal">Non-Hormonal</option>
                  </select>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Anything else we should know?
              </label>
              <textarea
                name="additionalInfo"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
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
