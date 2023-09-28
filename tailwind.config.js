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
        '460':'460px',
        '500':'500px',
        '570':'570px',
        '632':'632px',
        '760':'760px',
        '796':'796px',
        '900':'900px',
        '1024':'1024px',
        '1400':'1400px',
      },
      fontFamily:{
        overpass: ['Overpass', 'sans-serif'], 
      }
    },
  },
  
  plugins: [],
}
