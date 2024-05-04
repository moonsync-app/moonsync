/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'pk_live_Y2xlcmsubW9vbnN5bmMuYXBwJA',
  },
  webpack: (config) => {
    // See https://webpack.js.org/configuration/resolve/#resolvealias
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      'onnxruntime-node$': false,
    };
    return config;
  },
  experimental: {
    outputFileTracingIncludes: {
      '/*': ['./cache/**/*'],
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
