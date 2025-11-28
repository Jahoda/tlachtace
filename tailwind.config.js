/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				tlachtace: {
					red: '#B71C1C',
					'red-dark': '#8B0000',
					brown: '#8B4513',
					'brown-light': '#A0522D',
					beige: '#F5F5DC',
					'gray-light': '#E8E8E8',
					'gray-nav': '#404040'
				}
			}
		}
	},
	plugins: []
};
