const BASE_URL = "https://frontend-take-home-service.fetch.com"

const ENDPOINT = {
	login: `${BASE_URL}/auth/login`,
	logout: `${BASE_URL}/auth/logout`,
	searchDogs: `${BASE_URL}/dogs/search`,
	dogs: `${BASE_URL}/dogs`,
	getBreeds: `${BASE_URL}/dogs/breeds`,
	getMatch: `${BASE_URL}/dogs/match`,
}

export default ENDPOINT
