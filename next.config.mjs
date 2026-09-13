/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Job photos are uploaded to Supabase Storage. The project ref differs
    // between environments (chavez-tree-test locally vs. production), so
    // this uses a wildcard subdomain pattern rather than a single hardcoded
    // hostname - matches any <project-ref>.supabase.co Storage URL.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
