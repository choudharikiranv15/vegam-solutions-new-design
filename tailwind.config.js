/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#f5f3ff',
                    100: '#ede9fe',
                    200: '#ddd6fe',
                    300: '#c4b5fd',
                    400: '#a78bfa',
                    500: '#8b5cf6', // Violet
                    600: '#7c3aed',
                    700: '#6d28d9',
                    900: '#4c1d95',
                },
                dark: {
                    bg: '#0F1219',     // Very dark blue/grey
                    surface: '#1A1E29', // Slightly lighter
                    card: '#1A1E29',
                    border: '#2A3042',
                }
            },
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 10px 40px -10px rgba(0,0,0,0.08)',
                'glow': '0 0 20px rgba(139, 92, 246, 0.5)'
            }
        },
    },
    plugins: [],
}
