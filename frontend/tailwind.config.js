/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
        extend: {
                fontFamily: {
                        serif: ['"Cormorant Garamond"', 'serif'],
                        sans: ['"Outfit"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                },
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                },
                colors: {
                        ink: '#2A2018',
                        bone: '#FBF7F0',
                        cream: '#F4E8DE',
                        blush: {
                                DEFAULT: '#F2D5C8',
                                deep: '#EBC1B0',
                        },
                        maroon: {
                                DEFAULT: '#8B1C2D',
                                dark: '#5A0F1E',
                                light: '#B33144',
                        },
                        sage: {
                                DEFAULT: '#5C6B3C',
                                dark: '#3B461F',
                                soft: '#9AA77C',
                        },
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
                        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
                        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
                        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
                        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
                        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
                        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                },
                keyframes: {
                        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
                        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
                        'fade-up': { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
                        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
                        'float': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
                        'sway': { '0%,100%': { transform: 'rotate(-1.5deg)' }, '50%': { transform: 'rotate(1.5deg)' } },
                        'flutter-x': {
                                '0%,100%': { transform: 'translate(0,0) rotate(-2deg)' },
                                '25%': { transform: 'translate(8px,-6px) rotate(4deg)' },
                                '50%': { transform: 'translate(14px,4px) rotate(-3deg)' },
                                '75%': { transform: 'translate(4px,8px) rotate(2deg)' }
                        },
                },
                animation: {
                        'accordion-down': 'accordion-down 0.2s ease-out',
                        'accordion-up': 'accordion-up 0.2s ease-out',
                        'fade-up': 'fade-up 0.9s ease-out both',
                        'fade-in': 'fade-in 1.2s ease-out both',
                        'float': 'float 6s ease-in-out infinite',
                        'sway': 'sway 9s ease-in-out infinite',
                        'flutter': 'flutter-x 7s ease-in-out infinite',
                }
        }
  },
  plugins: [require("tailwindcss-animate")],
};
