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
	const LoginReq = async (name: string, email: string): Promise<string> => {
		try {
			const url = ENDPOINT.login
			const method = "POST"
			const data: User = { name: name, email: email }

			const response = await makeRequest<string>(url, method, data)
			// console.log("Login Res:", response.data)
			return response.data
		} catch (error: any) {
			return Promise.reject("Login failed")
		}
	}

	const LogoutReq = async (): Promise<string> => {
		try {
			const url = ENDPOINT.logout
			const method = "POST"

			const response = await makeRequest<string>(url, method, {})
			// console.log("Logout res:", response.data)
			return response.data
		} catch (error: any) {
			return Promise.reject("Logout failed")
		}
	}

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
			return response.data
		} catch (error: any) {
			return Promise.reject("Error fetching")
		}
	}

	const getDogsReq = async (dogIds: string[]): Promise<Dogs> => {
		try {
			const url = ENDPOINT.dogs
			const method = "POST"

			const response = await makeRequest<Dogs>(url, method, dogIds)
			// console.log("Dogs response:", response.data)
			return response.data
		} catch (error: any) {
			return Promise.reject("Failed to fetch dogs")
		}
	}

	const fetchBreeds = async (): Promise<String[]> => {
		try {
			const url = ENDPOINT.getBreeds
			const method = "GET"

			const response = await makeRequest<String[]>(url, method)
			// console.log("Fetch breeds response:", response.data)
			return response.data
		} catch (error: any) {
			return Promise.reject("Failed to fetch breeds")
		}
	}

	const dogMatchReq = async (dogIds: string[]): Promise<MatchResponse> => {
		try {
			const url = ENDPOINT.getMatch
			const method = "POST"

			const response = await makeRequest<MatchResponse>(url, method, dogIds)
			// console.log("Get match res:", response.data)
			return response.data
		} catch (error: any) {
			return Promise.reject("Failed to find a match")
		}
	}

	return {
		LoginReq,
		LogoutReq,
		searchDogsReq,
		getDogsReq,
		fetchBreeds,
		dogMatchReq,
	}
})()

export default api
