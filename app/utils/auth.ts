import { SupabaseClient } from "@supabase/supabase-js";
import Terra from "terra-api";

export async function updateUser(
  supabase: SupabaseClient<any, "public", any>,
  userId: string | null,
  searchParams: { [key: string]: string | string[] | undefined },
) {
  if (searchParams?.reference_id && userId) {
    const { data, error } = await supabase
      .from("users")
      .update([
        {
          clerk_user_id: userId,
          biometrics_connected: true,
          terra_user_id: searchParams.user_id,
        },
      ])
      .eq("clerk_user_id", userId);
    return data;
  }
}

export async function createUserAndGenerateSession(
  supabase: SupabaseClient<any, "public", any>,
  userId: string | null,
) {
  if (userId) {
    console.log("USERID", userId);
    const { TERRA_DEV_ID, TERRA_API_KEY, TERRA_API_SECRET } = process.env;

    const terra = new Terra(
      TERRA_DEV_ID || "",
      TERRA_API_KEY || "",
      TERRA_API_SECRET || "",
    );

    let userData;
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("clerk_user_id", userId);

    if (data?.length === 0) {
      console.log("USER NOT FOUND");
      const { data: newData, error } = await supabase
        .from("users")
        .insert([{ clerk_user_id: userId }]);
      userData = newData;
    } else {
      userData = data;
    }

    if (!userData?.[0]?.biometrics_connected) {
      try {
        const res = await terra.generateWidgetSession({
          referenceID: userId ?? "",
          providers:
            "OURA,GOOGLE,CLUE,GARMIN,STRAVA,WHOOP,POLAR,WITHINGS,SAMSUNG,APPLE".split(
              ",",
            ),
          authSuccessRedirectUrl: "http://localhost:3000",
          language: "en",
        });
        console.log("AUTH URL", res.url);
        return res.url;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
