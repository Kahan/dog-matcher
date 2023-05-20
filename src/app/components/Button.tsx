import { FC, MouseEventHandler } from "react"

interface ButtonProps {
	text: string
	type: "button" | "submit" | "reset" | undefined
	variant?: string
	onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}

const Button: FC<ButtonProps> = ({ text, type, variant, onClick }) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`
			flex justify-center align-center transition duration-200 ease-linear hover:opacity-80  rounded-md  px-12 py-3 min-w-full sm:min-w-max
			${variant === "primary" ? "text-title bg-primary" : "text-white bg-accent"}
			`}
		>
			{text}
		</button>
	)
}

export default Button
