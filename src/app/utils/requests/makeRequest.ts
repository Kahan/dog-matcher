import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

async function makeRequest<T>(url: string, method: string, data?: object, params?: any): Promise<AxiosResponse<T>> {
  try {
    const config: AxiosRequestConfig = {
      url,
      method,
      data,
      params,
      // paramsSerializer: (_params) => queryString.stringify(_params),
      withCredentials: true, // Include credentials (cookies) with the request
    };

    const response: AxiosResponse<T> = await axios(config);
    return response;
  } catch (error) {
    throw error;
  }
}

export default makeRequest;
