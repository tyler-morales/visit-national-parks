module.exports = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY,
    NEXT_PUBLIC_MAPBOX_API_KEY: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
    MAPBOX_API_KEY: process.env.MAPBOX_API_KEY,
  },
  images: {
    domains: ['www.nps.gov', 'images.unsplash.com'],
  },
}
