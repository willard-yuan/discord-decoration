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
        // Primary colors
        primary: 'var(--color-primary)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        critical: 'var(--color-critical)',
        
        // Base colors
        'base-low': 'var(--color-base-low)',
        'base-lower': 'var(--color-base-lower)',
        'base-lowest': 'var(--color-base-lowest)',
        
        // Surface colors
        'surface-overlay': 'var(--color-surface-overlay)',
        'surface-high': 'var(--color-surface-high)',
        'surface-higher': 'var(--color-surface-higher)',
        'surface-highest': 'var(--color-surface-highest)',
        
        // Border colors
        'border-normal': 'var(--color-border-normal)',
        'border-light': 'var(--color-border-light)',
        'border-faint': 'var(--color-border-faint)',
        'border-strong': 'var(--color-border-strong)',
        
        // Icon colors
        'icon': 'var(--color-icon)',
        'icon-tertiary': 'var(--color-icon-tertiary)',
        
        // Text colors
        'text': 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        'text-link': 'var(--color-text-link)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-positive': 'var(--color-text-positive)',
        'text-warning': 'var(--color-text-warning)',
        'text-critical': 'var(--color-text-critical)',
        
        // Button colors
        'button-primary-background': 'var(--color-button-primary-background)',
        'button-primary-hover': 'var(--color-button-primary-hover)',
        'button-primary-active': 'var(--color-button-primary-active)',
        'button-primary-border': 'var(--color-button-primary-border)',
        'button-secondary-background': 'var(--color-button-secondary-background)',
        'button-secondary-hover': 'var(--color-button-secondary-hover)',
        'button-secondary-active': 'var(--color-button-secondary-active)',
        'button-secondary-border': 'var(--color-button-secondary-border)',
      },
      fontFamily: {
        'ginto': ['"ABC Ginto Nord"', '"ABC Ginto Nord Fallback"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}