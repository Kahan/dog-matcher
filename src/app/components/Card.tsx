import { FC } from "react"
import dogIcon from "../../assets/dogIcon.svg"
import locationIcon from "../../assets/locationIcon.svg"
import { Dog } from "../utils/requests/types"

interface CardProps {
	dog: Dog
	selected: string[]
	setSelectedDogs: React.Dispatch<React.SetStateAction<string[]>>
}

const Card: FC<CardProps> = ({ dog, selected, setSelectedDogs }) => {
	const handleSelect = (id: string) => {
		if (selected.includes(id)) {
			setSelectedDogs((prevSelectedDogs) =>
				prevSelectedDogs.filter((dogId) => dogId !== id)
			)
		} else {
			setSelectedDogs((prevSelectedDogs) => [...prevSelectedDogs, id])
		}
	}

	return (
		<button
			onClick={() => handleSelect(dog.id)}
			className={`
			p-4 flex flex-col gap-3 shadow-md bg-white rounded-lg cursor-pointer lg:flex-row border-2 border-solid border-transparent ${
				selected.includes(dog.id) && "active-card"
			}
			`}
		>
			<img
				className="w-[100%] aspect-square object-cover rounded-sm md:rounded-md lg:w-2/5 lg:self-center"
				src={dog.img}
				alt="dog photo"
			/>
			<div className="w-full flex flex-col gap-2">
				<p className="card-font ">
					{dog.name}, {dog.age}
				</p>

				<div className="card-grid gap-1">
					<img className="sm:w-6 " src={dogIcon} alt="Dog icon" />
					<p className="card-font whitespace-nowrap text-ellipsis overflow-hidden">
						{dog.breed}
					</p>
				</div>
				<div className="flex gap-1">
					<img className="sm:w-6" src={locationIcon} alt="Location icon" />
					<p className="card-font">{dog.zip_code}</p>
				</div>
			</div>
		</button>
	)
}

export default Card
