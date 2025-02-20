import type { NextConfig } from 'next';

const withPWA = require('next-pwa')({
  dest: 'public',
});

const nextConfig: NextConfig = withPWA({
  /* config options here */
});

export default nextConfig;
