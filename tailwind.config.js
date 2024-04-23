/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/**/*.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#7e57c2',
      },
      borderColor: theme => ({
        ...theme('colors'),
        'default': theme('colors.gray.300', 'currentColor'),
        'hover': '#7e57c2',
      })
    }
  },
  plugins: [],
}

