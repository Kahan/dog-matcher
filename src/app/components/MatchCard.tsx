import { FC } from "react"
import { Dog } from "../utils/requests/types"
import Button from "./Button"

interface MatchCardProps {
	match: Dog
	resetMatch: Function
}

const MatchCard: FC<MatchCardProps> = ({ match, resetMatch }) => {
	const handleClick = () => {
		resetMatch()
	}

	return (
		<div className="bg-white rounded-3xl flex flex-col items-center gap-5 px-12 py-12 max-w-md md:px-20">
			<img
				className=" w-2/5 rounded-full aspect-square object-cover"
				src={match.img}
				alt="Dog image"
			/>
			<div className="w-8 h-1 bg-title rounded-sm" />
			<div className="flex flex-col gap-3 items-center">
				<h1 className="font-title font-md text-title">Meet {match.name}</h1>
				<p className="text-center text-body text-xs">
					{generateDogParagraph(match.name, match.age)}
				</p>
			</div>
			<Button
				text="Adopt me :)"
				type="button"
				variant="primary"
				onClick={handleClick}
			/>
		</div>
	)
}

export default MatchCard

const generateDogParagraph = (name: string, age: number) => {
	// Array of possible sentences with placeholders for the name
	const sentences = [
		"Hello, my name is [name], and I am a loving and friendly companion looking for my forever home. At [age] years old, I have the perfect balance of playfulness and maturity.",
		"Meet [name], the adorable dog ready to bring joy and loyalty into your life. With [age] years of experience, I've learned to be the most loyal and trustworthy companion you could ask for.",
		"Hello there! I'm [name], a [age]-year-old furry bundle of happiness eager to join your family. I have a heart full of love to give and an energetic spirit that will keep you entertained and active.",
		"Say hello to [name], a [age]-year-old dog with a heart of gold. I'm ready to shower you with unconditional love, cuddles, and loyalty. I'll be your steadfast companion through thick and thin.",
		"Greetings! My name is [name], and at [age] years old, I've mastered the art of being a perfect cuddle buddy. With my charming personality and gentle nature, I'll bring warmth and happiness to your home.",
		"Introducing [name], a [age]-year-old canine treasure seeking a loving family. I come with a winning smile, a wagging tail, and a heart full of affection. Let's embark on countless adventures together!",
	]

	// Choose a random sentence
	const randomIndex = Math.floor(Math.random() * sentences.length)
	let paragraph = sentences[randomIndex]

	// Replace the placeholder [name] with the provided name
	paragraph = paragraph.replace(/\[name\]/g, name)

	// Replace the placeholder [age] with the provided age
	paragraph = paragraph.replace(/\[age\]/g, age.toString())

	return paragraph
}
