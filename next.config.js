/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  swcMinify: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: `/api/:path*`,
  //       destination:
  //         'http://ec2-3-36-123-5.ap-northeast-2.compute.amazonaws.com/api/:path*',
  //     },
  //   ];
  // },
  images: {
    domains: [
      `avatars.githubusercontent.com`,
      `https://acoha.s3.ap-northeast-2.amazonaws.com`,
    ],
  },
};
module.exports = nextConfig;

/**
 * source: `/api/:path*`,
  destination: `http://ec2-3-36-123-5.ap-northeast-2.compute.amazonaws.com/api/:path*`,
 */
