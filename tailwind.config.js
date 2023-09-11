/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      spacing: {
        '292':'292px',
        '300':'300px',
        '360':'360px',
        '396':'396px',
        '500':'560px',
        '600':'600px',
        '648':'648px',
        '760':'760px',
        '800':'800px',
        '1000':'1000px',
      },
      fontFamily:{
        overpass: ['Overpass', 'sans-serif'], 
      }
    },
  },
  plugins: [],
}
