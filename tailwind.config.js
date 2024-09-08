/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'

  ],
  theme: {
    colors:{
      'maroon':'#97144d',
      "maroon-0":"#FFF4F9",
      'maroon-1':'#FFAFD7',
      "maroon-2":'#FF89B2',
      "maroon-3":'#E6648F',
      "maroon-4":'#BE3F6D'
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/forms'),
  ],
}

