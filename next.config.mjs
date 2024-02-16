/** @type {import('next').NextConfig} */
const nextConfig = {
  // May not be necessary to specify these in the future
  // https://nextjs.org/docs/app/api-reference/next-config-js/serverComponentsExternalPackages
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium'],
  },
};

export default nextConfig;
