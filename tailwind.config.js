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
        '512':'512px',
        '632':'632px',
        '760':'760px',
        '796':'796px',
        '900':'900px',
      },
      fontFamily:{
        overpass: ['Overpass', 'sans-serif'], 
      }
    },
  },
  
  plugins: [],
}
