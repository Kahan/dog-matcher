import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

async function makeRequest<T>(
	url: string,
	method: string,
	data?: object,
	params?: any
): Promise<AxiosResponse<T>> {
	try {
		const config: AxiosRequestConfig = {
			url,
			method,
			data,
			params,
			withCredentials: true, // Include credentials (cookies) with the request
		}

		const response = await axios(config)
		return response
	} catch (error) {
		return Promise.reject(error)
	}
}

export default makeRequest
