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
};
module.exports = nextConfig;

/**
 * source: `/api/:path*`,
  destination: `http://ec2-3-36-123-5.ap-northeast-2.compute.amazonaws.com/api/:path*`,
 */
