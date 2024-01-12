const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      `avatars.githubusercontent.com`,
      `a-coha.s3.ap-northeast-2.amazonaws.com`,
    ],
    formats: [`image/webp`],
  },
};
module.exports = nextConfig;
