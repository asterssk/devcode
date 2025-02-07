import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => {
    return [
      { source: "/s", destination: "/", permanent: true },
      { source: "/u", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
