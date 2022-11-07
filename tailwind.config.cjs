/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage:{
        'main-page': "url('/HomeBG.png')",
      },
      backgroundSize:{
        'auto': 'auto',
        'cover': 'cover',
        '100%': '100%',
      }
    },
  },
  plugins: [],
};
