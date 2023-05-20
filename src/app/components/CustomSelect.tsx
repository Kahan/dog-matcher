import { FC, useEffect, useState } from "react"
import Select, {
	ActionMeta,
	CSSObjectWithLabel,
	GroupBase,
	MultiValue,
	OptionProps,
} from "react-select"
import api from "../utils/requests/api"
import { StylesConfig } from "react-select"

interface CustomSelectProps {
	setSelectedBreeds: React.Dispatch<React.SetStateAction<string[]>>
}

const CustomSelect: FC<CustomSelectProps> = ({ setSelectedBreeds }) => {
	// Select options for react-select
	const [selectOptions, setSelectOptions] = useState<
		{ value: String; label: String }[]
	>([])

	// Styles for react-select
	const customStyles: StylesConfig<any> = {
		control: (base: CSSObjectWithLabel) => ({
			...base,
			padding: [12, 10],
			fontSize: 16,
			outline: "none",
			background: "#ffffff",
			height: "100%",
			minWidth: "250px",
			borderWidth: "2px",
			borderColor: "rgb(228 228 231)",
			borderStyle: "solid",
			borderRadius: 6,
		}),
		option: (
			base: CSSObjectWithLabel,
			{ isFocused }: OptionProps<any, boolean, GroupBase<any>>
		) => ({
			...base,
			backgroundColor: isFocused ? "rgb(233 213 255 / 1)" : "white",
		}),
	}

	const handleSelect: (
		newValue: MultiValue<any>,
		actionMeta: ActionMeta<any>
	) => void = (option) => {
		const breeds = option.map((o) => o.label)
		setSelectedBreeds(breeds)
	}

	const getBreeds = async () => {
		try {
			const res = await api.fetchBreeds()
			const options = res.map((r) => ({ value: r, label: r }))
			setSelectOptions(options)
		} catch (msg) {
			console.log(msg)
		}
	}

	useEffect(() => {
		getBreeds()
	}, [])

	return (
		<Select
			isMulti
			styles={customStyles}
			options={selectOptions}
			onChange={handleSelect}
		/>
	)
}

export default CustomSelect
