import type { Config } from 'tailwindcss';
import { colors } from './colors';

const config: Config = {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            screens: {
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
                '3xl': '1720px',
            },
            colors: {
                theme: colors
            }
        },
    },
    plugins: [],
};

export default config;