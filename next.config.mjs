
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repo = 'Kahf1'; // اسم المستودع بالضبط

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },     // GitHub Pages ما يدعم Image Optimization
                 
};

export default nextConfig;