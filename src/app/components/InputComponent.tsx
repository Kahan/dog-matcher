import { FC } from "react"

interface InputComponentProps {
	label: string
	value: string
	type: React.HTMLInputTypeAttribute
	handleChange: (value: React.ChangeEvent<HTMLInputElement>) => void
}

const InputComponent: FC<InputComponentProps> = ({
	label,
	value,
	type,
	handleChange,
}) => {
	return (
		<div className="flex flex-col gap-2 sm:gap-4">
			<label htmlFor={label}>
				{label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()}
			</label>
			<input
				required
				className="flex items-center p-2 bg-white rounded-md border-2 border-md"
				name={label}
				id={label}
				type={type}
				value={value}
				onChange={handleChange}
				placeholder={
					label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()
				}
			/>
		</div>
	)
}

export default InputComponent
