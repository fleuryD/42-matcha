// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { useState, useEffect } from "react"
import { API_BASE_URL /* , getUserToken */ } from "./constants" // ?????????????????

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export const useFetch = ({ shortUrl, method, expected = null, body = null, publicAccess = false }) => {
	const [data, setData] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)
	const [errorResponse, setErrorResponse] = useState(null)

	const url = API_BASE_URL + shortUrl

	useEffect(() => {
		const requestOptions = {
			method,
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: publicAccess ? null : "Bearer " + localStorage.getItem("access_token"),
			},
			body: body ? JSON.stringify(body) : null,
		}

		const fetchData = async () => {
			setIsLoading(true)
			setErrorResponse(null)
			try {
				const response = await fetch(url, requestOptions)

				if (!response.ok) throw new Error(response.statusText)
				const json = await response.json()
				setIsLoading(false)
				setData(json)
				setError(null)
				console.log(json)
				//setErrorResponse(json)
			} catch (error) {
				setErrorResponse(error)
				setIsLoading(false)
			}
		}
		fetchData()
	}, [url, body, method, publicAccess])

	return { data, setData, isLoading, error, errorResponse }
}
