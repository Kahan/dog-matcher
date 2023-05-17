/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			title: ["Syne", "sans-serif"],
			body: ["Lexend", "sans-serif"],
		},
		extend: {
			colors: {
				primary: "var(--color-primary)",
				accent: "var(--color-secondary)",
				warm: "var(--color-warm)",
				cold: "var(--color-cold)",
				title: "var(--color-title)",
				body: "var(--color-body)",
			},
		},
	},
	plugins: [],
}
