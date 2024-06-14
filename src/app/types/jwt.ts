import { type JwtPayload } from "@clerk/types";

export interface CustomJwtPayload extends JwtPayload {
  metadata?: {
    onboardingComplete?: boolean;
  };
}
