// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}", // adjust as needed
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addVariant }) {
      // Add `screen:` variant for all utilities
      addVariant('screen', '@media screen')
    },
  ],
}