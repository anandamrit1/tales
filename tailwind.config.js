/* global module */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      Satoshi12px: ['Satoshi12px'],
      Satoshi14px: ['Satoshi14px', 'Helvetica', 'Arial', 'sans-serif'],
      Satoshi16px: ['Satoshi16px', 'Helvetica', 'Arial', 'sans-serif'],
      Satoshi20px: ['Satoshi20px', 'Helvetica', 'Arial', 'sans-serif'],
      Satoshi24px: ['Satoshi24px', 'Helvetica', 'Arial', 'sans-serif'],
    },
    colors: {
      ...defaultTheme.colors,
      green: {
        200: '#BFFFE3',
        400: '#94FFD1',
        600: '#6AFFBE',
        800: '#3FFFAC',
        900: '#16FF99',
      },
      red: {
        300: '#FF707E',
        600: '#D10014',
        800: '#70000B',
      },
      gray: {
        50: '#F4F4F4',
        100: '#E8E8E8',
        200: '#D6D6D6',
        300: '#B8B8B8',
        400: '#9E9E9E',
        600: '#696969',
        800: '#383838',
        900: '#212121',
      },
      black: {
        50: '#0000000F',
        100: '#000000',
      },
      indigo: {
        300: '#8583EC',
        400: '#5957E5',
      },
      yellow: {
        500: '#FFCE0A',
        600: '#D1A700',
        900: '#423500',
      },
      teal: {
        800: '#005070',
        900: '#002F42',
      },
      white: {
        0: '#00000000',
        30: '#FFFFFF1E',
        100: '#FFFFFF',
      },
      custom: {
        100: '#29a87400',
        200: '#29a87452',
      },
    },
    extend: {
      animation: {
        fadeIn: 'fadeIn 2s ease-in-out',
        translate: 'translateY 1s ease-in-out',
      },
      keyframes: (theme) => ({
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        translateY: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50px)' },
        },
      }),
      transitionProperty: {
        transform: 'transform',
      },
    },
  },
  plugins: [],
};
