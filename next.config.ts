import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'ppynynwcqyrokafwyxkq.supabase.co',
    ],
  },
};

export default nextConfig;
