/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*{html, js}', 
    './js/**/*{html,js}'
  ],
  
  theme: {
    extend: {
      spacing: {
        '280':'280px',
        '300':'300px',
        '360':'360px',
        '396':'396px',
        '500':'500px',
        '600':'600px',
        '631':'631px',
        '760':'760px',
        '796':'798px',
        '800':'800px',
        '900':'900px',
      },
      fontFamily:{
        overpass: ['Overpass', 'sans-serif'], 
      }
    },
  },
  
  plugins: [],
}
