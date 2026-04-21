/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // --- ADD THIS SECTION START ---
      keyframes: {
        dimlight: {
          '0%, 18%, 20%, 50.1%, 60%, 65.1%, 80%, 90.1%, 92%': {
            color: '#0e3742', // Dark teal color when "off"
            boxShadow: 'none',
            textShadow: 'none',
          },
          '18.1%, 20.1%, 30%, 50%, 60.1%, 65%, 80.1%, 90%, 92.1%, 100%': {
            color: '#fff', // White color when "on"
            textShadow: '0 0 10px #03bcf4, 0 0 20px #03bcf4', // Neon glow
          },
        },
      },
      animation: {
        dimlight: 'dimlight 5s infinite',
      },
      // --- ADD THIS SECTION END ---
    },
  },
  plugins: [],
}