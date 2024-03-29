const { rapidStylesPath, rapidTailwindTheme, rapidPlugin } = require("@rapid-web/ui");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html', rapidStylesPath],

  theme: {
    extend: rapidTailwindTheme({

    })
  },
  plugins: [rapidPlugin(
    {
      global: {
        'body': {
          backgroundColor: 'white',
        }
      }
    }
  )],
}
