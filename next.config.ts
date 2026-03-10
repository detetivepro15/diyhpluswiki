import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Wiki content files should not be treated as pages
  pageExtensions: ["tsx", "ts", "jsx", "js"],
};

export default nextConfig;
