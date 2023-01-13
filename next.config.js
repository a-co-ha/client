/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  presets: [
    {
      'preset-react': {
        runtime: 'automatic',
        importSource: '@emotion/react',
      },
    },
  ],
};

module.exports = nextConfig;
