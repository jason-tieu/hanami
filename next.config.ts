import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  // Remove static export to enable middleware and server-side features
  // output: 'export', // Commented out to enable middleware
  trailingSlash: true,
  images: {
    // Remove unoptimized for better performance with server-side rendering
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: false,
    qualities: [25, 50, 75, 90, 100],
  },
  // Configure MDX
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default withMDX(nextConfig);
