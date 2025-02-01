import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['iilyvqdglsibtocvjxjd.supabase.co'],
  },
};

export default nextConfig;
