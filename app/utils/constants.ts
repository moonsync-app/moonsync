// API endpoints
export const BIOMETRICS_API_URL: string = process.env.BIOMETRICS_API_URL || "";
export const CHAT_API_URL: string = process.env.CHAT_API_URL || "";
export const DASHBOARD_API_URL: string = process.env.DASHBOARD_API_URL || "";

export const BACKEND_HOST: string =
  process.env.NODE_ENV === "production"
    ? "https://app.moonsync.app"
    : "http://localhost:3000";
