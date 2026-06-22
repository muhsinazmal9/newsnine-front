/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows all domains
      },
      {
        protocol: 'http',
        hostname: '**', // Optional: Allows unsafe HTTP domains too
      },
    ],
  },
};

export default nextConfig;
