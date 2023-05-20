export type User = {
	name: string
	email: string
}

export type Dog = {
	id: string
	img: string
	name: string
	age: number
	zip_code: string
	breed: string
}

export type Dogs = {
	id: string
	img: string
	name: string
	age: number
	zip_code: string
	breed: string
}[]

export type DogsSearchFilter = {
	breeds?: string[]
	zipCodes?: string[]
	ageMin?: number
	ageMax?: number
	size?: number
	from?: number
	sort?: string
}

export type DogsSearchResponse = {
	resultIds: string[]
	total: number
	next?: string
	prev?: string
}

export type MatchResponse = {
	match: string
}
