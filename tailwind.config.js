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
				accent: "var(--color-accent)",
				warm: "var(--color-warm)",
				cold: "var(--color-cold)",
				title: "var(--color-title)",
				body: "var(--color-body)",
				colorBorder: "var(--color-border)",
				activeBg: "var(--color-active-card-bg)",
				activeBd: "var(--color-active-card-border)",
			},
		},
	},
	plugins: [],
}
