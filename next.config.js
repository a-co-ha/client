/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
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
module.exports = withPlugins([[withBundleAnalyzer], nextConfig]);
