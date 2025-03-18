
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-Request-With, X-Requested-With, Origin, Cache-Control, Content-Type, Accept" },
        ]
      }
    ]
  }
}

module.exports = nextConfig

module.exports = nextConfig