import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Local development can override this in .env.local; deployments use Render by default.
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL ?? "https://oscenox.onrender.com",
  },
};

export default nextConfig;
