/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        return config;
      },
    // experimental: {
    //     esmExternals: "loose", // <-- add this
    //    serverComponentsExternalPackages: ["mongoose"] 
    // }
    }

export default nextConfig;
