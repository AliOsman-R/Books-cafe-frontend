/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideInFromRight: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInFromBottom: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        slideInFromRight: 'slideInFromRight 1s ease-out forwards',
        slideInFromBottom: 'slideInFromBottom 1s ease-out forwards',
      },
      screens:{
        ssm:'360px',
        xl:'1217px'
      },

      colors:{
        primaryColor:'#f59e0b',
        secondaryColor:'#f9dbb9',
        primaryTextColor:'#FFF1E1',
        primaryColorHover:'#b57a37',
        secondaryColorHover:'#e2b58c',
      }
    },
  },
  plugins: [],
}

//f59e0b 5c3b28 704214
//cd8c42
//e49b49
//bg-[#172133]
//cd8c42