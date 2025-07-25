const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/react/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'orbitron': ['var(--font-orbitron)', 'monospace'],
        'rajdhani': ['var(--font-rajdhani)', 'sans-serif'],
        'exo2': ['var(--font-exo2)', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        cyber: {
          blue: '#00d4ff',
          pink: '#ff0080',
          green: '#00ff88',
          purple: '#8b5cf6',
          dark: '#0a0a0f',
          darker: '#050508',
          gray: '#1a1a2e',
        },
        neon: {
          blue: '#00d4ff',
          pink: '#ff0080',
          green: '#00ff88',
          yellow: '#ffff00',
          purple: '#bf00ff',
        }
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
        'neon-gradient': 'linear-gradient(45deg, #00d4ff, #ff0080, #00ff88)',
        'holographic': 'linear-gradient(45deg, rgba(0,212,255,0.1) 0%, rgba(255,0,128,0.1) 25%, rgba(0,255,136,0.1) 50%, rgba(255,0,128,0.1) 75%, rgba(0,212,255,0.1) 100%)',
      },
      animation: {
        'glitch': 'glitch 0.3s infinite',
        'scan-line': 'scan-line 3s linear infinite',
        'matrix-rain': 'matrix-rain 2s linear infinite',
        'holographic-shift': 'holographic-shift 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-neon': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(0, 212, 255, 0.5)',
        'neon-pink': '0 0 20px rgba(255, 0, 128, 0.5)',
        'neon-green': '0 0 20px rgba(0, 255, 136, 0.5)',
        'cyber': '0 0 30px rgba(0, 212, 255, 0.3), inset 0 0 30px rgba(255, 0, 128, 0.1)',
      },
      backdropBlur: {
        'cyber': '20px',
      }
    },
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      light: {
        colors: {
          background: '#f8fafc',
          foreground: '#1e293b',
          primary: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#1e40af',
            600: '#1d4ed8',
            700: '#1e3a8a',
            800: '#1e40af',
            900: '#1e3a8a',
            DEFAULT: '#1e40af',
            foreground: '#ffffff',
          },
          secondary: {
            DEFAULT: '#be185d',
            foreground: '#ffffff',
          },
          success: {
            DEFAULT: '#059669',
            foreground: '#ffffff',
          },
          warning: {
            DEFAULT: '#d97706',
            foreground: '#ffffff',
          },
          danger: {
            DEFAULT: '#dc2626',
            foreground: '#ffffff',
          },
        },
      },
      dark: {
        colors: {
          background: '#0a0a0f',
          foreground: '#e0e6ed',
          primary: {
            50: '#e6f9ff',
            100: '#b3ecff',
            200: '#80dfff',
            300: '#4dd2ff',
            400: '#1ac5ff',
            500: '#00d4ff',
            600: '#00a8cc',
            700: '#007c99',
            800: '#005066',
            900: '#002433',
            DEFAULT: '#00d4ff',
            foreground: '#000000',
          },
          secondary: {
            50: '#ffe6f7',
            100: '#ffb3e6',
            200: '#ff80d5',
            300: '#ff4dc4',
            400: '#ff1ab3',
            500: '#ff0080',
            600: '#cc0066',
            700: '#99004d',
            800: '#660033',
            900: '#33001a',
            DEFAULT: '#ff0080',
            foreground: '#ffffff',
          },
          success: {
            DEFAULT: '#00ff88',
            foreground: '#000000',
          },
          warning: {
            DEFAULT: '#ffff00',
            foreground: '#000000',
          },
          danger: {
            DEFAULT: '#ff0040',
            foreground: '#ffffff',
          },
        },
      },
    },
  })],
}