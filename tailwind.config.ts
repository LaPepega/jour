import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	darkMode: 'selector',

	theme: {
		extend: {}
	},

	plugins: [require('@tailwindcss/typography')]
} as Config;
