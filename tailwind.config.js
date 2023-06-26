/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/atom/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/styles/*.css',
  ],
  theme: {
    extend: {},
  },
  plugins: [require(`tailwind-scrollbar-hide`)],
};
