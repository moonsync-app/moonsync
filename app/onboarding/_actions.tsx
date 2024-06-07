"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export const completeOnboarding = async (formData: FormData) => {
  const { userId } = auth();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  try {
    const privateMetadata = {
      fullName: formData.get("name"),
      dateOfBirth: formData.get("dob"),
      wearablesUsage: formData.get("wearablesUsage"),
      trackers: formData.getAll("trackers"),
      otherTracker: formData.get("otherTracker"),
      fullCycleLength: formData.get("fullCycleLength"),
      periodLength: formData.get("periodLength"),
      lastPeriod: formData.get("lastPeriod"),
      conditions: formData.getAll("conditions"),
      moreConditions: formData.getAll("moreConditions"),
      birthControl: formData.get("birthControl"),
      birthControlType: formData.get("birthControlType"),
      additionalInfo: formData.get("additionalInfo"),
    };

    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
      },
      privateMetadata: privateMetadata,
    });
    return { message: "User metadata Updated" };
  } catch (e) {
    console.log("error", e);
    return { message: "Error Updating User Metadata" };
  }
};
