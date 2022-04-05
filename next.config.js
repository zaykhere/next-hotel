/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig: nextConfig,
  env: {
    DB_URL:
      "mongodb+srv://zain:Iambest42@todoitemsback.soy2c.gcp.mongodb.net/next-hotel?retryWrites=true&w=majority",
  },
};
