/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Produce a fully static website output in ./out (plain HTML/CSS/JS + assets)
  // — deployable to any static host (Vercel, Netlify, GitHub Pages, etc.)
  output: "export",
};

export default nextConfig;
