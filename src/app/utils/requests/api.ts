import ENDPOINT from "./constants"
import makeRequest from "./makeRequest"
import {
	Dogs,
	DogsSearchFilter,
	DogsSearchResponse,
	MatchResponse,
	User,
} from "./types"

const api = (() => {
	// Callback funtion for when the session has expired and
	let expiredSessionFunction: (() => void) | null

	// Handles callback
	const expiredSessionHandler = (func: () => void) => {
		expiredSessionFunction = func
	}

	// Start the user login
	const LoginReq = async (name: string, email: string): Promise<string> => {
		try {
			const url = ENDPOINT.login
			const method = "POST"
			const data: User = { name: name, email: email }

			const response = await makeRequest<string>(url, method, data)
			// console.log("Login Res:", response.data)
			return Promise.resolve(response.data)
		} catch (error: any) {
			return Promise.reject("Login failed")
		}
	}

	// User logout
	const LogoutReq = async (): Promise<string> => {
		try {
			const url = ENDPOINT.logout
			const method = "POST"

			const response = await makeRequest<string>(url, method, {})
			// console.log("Logout res:", response.data)
			return Promise.resolve(response.data)
		} catch (error: unknown) {
			return Promise.reject("Logout failed")
		}
	}

	// Search dogs with the provided filters
	const searchDogsReq = async (
		filter: DogsSearchFilter
	): Promise<DogsSearchResponse> => {
		try {
			const url = ENDPOINT.searchDogs
			const method = "GET"

			const response = await makeRequest<DogsSearchResponse>(
				url,
				method,
				undefined,
				filter
			)

			// console.log("Search Dogs Response:", response.data)
			return Promise.resolve(response.data)
		} catch (error: any) {
			if (error.response.status === 401) {
				if (expiredSessionFunction) {
					expiredSessionFunction()
				}
				return Promise.reject("Please login again")
			}
			return Promise.reject("Error fetching")
		}
	}

	// Get dogs from the provided list of dogId
	const getDogsReq = async (dogIds: string[]): Promise<Dogs> => {
		try {
			const url = ENDPOINT.dogs
			const method = "POST"

			const response = await makeRequest<Dogs>(url, method, dogIds)
			// console.log("Dogs response:", response.data)
			return Promise.resolve(response.data)
		} catch (error: any) {
			return Promise.reject("Failed to fetch dogs")
		}
	}

	// Fetch the list of available breeds
	const fetchBreeds = async (): Promise<String[]> => {
		try {
			const url = ENDPOINT.getBreeds
			const method = "GET"

			const response = await makeRequest<String[]>(url, method)
			// console.log("Fetch breeds response:", response.data)
			return Promise.resolve(response.data)
		} catch (error: any) {
			if (error.response.status === 401) {
				if (expiredSessionFunction) {
					expiredSessionFunction()
				}
				return Promise.reject("Please login again")
			}
			return Promise.reject("Failed to fetch breeds")
		}
	}

	// Find a match
	const dogMatchReq = async (dogIds: string[]): Promise<MatchResponse> => {
		try {
			const url = ENDPOINT.getMatch
			const method = "POST"

			const response = await makeRequest<MatchResponse>(url, method, dogIds)
			// console.log("Get match res:", response.data)
			return Promise.resolve(response.data)
		} catch (error: any) {
			return Promise.reject("Failed to find a match")
		}
	}

	return {
		expiredSessionHandler,
		LoginReq,
		LogoutReq,
		searchDogsReq,
		getDogsReq,
		fetchBreeds,
		dogMatchReq,
	}
})()

export default api
