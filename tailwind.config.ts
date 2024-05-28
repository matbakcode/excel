import type { Config } from 'tailwindcss';

export default {
    content: [
        'index.html',
        './src/**/*.{js,jsx,ts,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        container: {
            center: true,
        },
        fontFamily: {
            sans: ["Inter", 'ui-sans-serif', 'system-ui']
        },
        letterSpacing: {
            tightest: '-.075em',
            tighter: '-.05em',
            tight: '-.025em',
            normal: '0',
            wide: '1px',
            wider: '2px',
            widest: '3px',
        }
    },
    darkMode: 'class',
    plugins: [],
} satisfies Config;