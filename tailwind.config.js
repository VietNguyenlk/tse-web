/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        darkblue: "#001f3f", // Add your custom dark blue color
      },
      appearance: ["none"],
    },
  },
  plugins: [require("flowbite/plugin")],
};
