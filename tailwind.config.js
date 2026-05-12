/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#ffffff',           // blanco
        blush: '#ffb6c1',           // rosa suave
        clay: '#e91e8e',            // rosa fuerte
        bark: '#1a0010',            // magenta muy oscuro (para texto sobre claro)
        'bark-dark': '#2d0018',     // magenta oscuro profundo (fondos secciones)
        'bark-light': '#7d1150',    // magenta medio (hover, bordes)
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-delay': 'float 4s ease-in-out infinite 1.5s',
        'float-delay2': 'float 4s ease-in-out infinite 3s',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-2deg)' },
          '50%': { transform: 'translateY(-16px) rotate(2deg)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
