/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: "https://accounts.moonsync.app/sign-up",
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: "https://accounts.moonsync.app/sign-in",
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NODE_ENV === "production"
        ? "pk_live_Y2xlcmsubW9vbnN5bmMuYXBwJA"
        : "pk_test_YWxsb3dpbmctam9leS01My5jbGVyay5hY2NvdW50cy5kZXYk",
  },
  webpack: (config) => {
    // See https://webpack.js.org/configuration/resolve/#resolvealias
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      "onnxruntime-node$": false,
    };
    return config;
  },
  experimental: {
    outputFileTracingIncludes: {
      "/*": ["./cache/**/*"],
    },
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
