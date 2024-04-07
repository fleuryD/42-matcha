// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { useState, useEffect } from "react"
import { IPGEOLOCATION_API_KEY } from "utils/constants"
import axios from "axios"
//import { API_BASE_URL /* , getUserToken */ } from "./constants" // ?????????????????
import zFetch from "../utils/zFetch"
import zxFetch from "../utils/zxFetch"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// * ■■■■■■■■■■■■■■■■■■■■■ USERS

// * ■■■■■■■■■■■■■■■■■■■■■

/**
 * @usedIn 	PageUserEditLocation
 */
/*
// deprecated
export async function apiGetUserForEditLocation(userId) {
	return zxFetch({
		shortUrl: "/users/" + userId + "/location-infos",
		method: "GET",
	})
}
*/


export async function apiGetCityNameFromCoord({ latitude, longitude }) {
	try {
		// const response = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`)
		//const response = await fetch(`https://api-adresse.data.gouv.fr/communes/?codepostal=${66000}`)
		const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=perpignan`)
		//const response = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${66000}`)
		console.log("🟪 zxfetch: response:", response)

		if (response?.statusCode >= 400 || response?.status >= 400) {
			console.error("🟪❌ zxfetch: response.statusCode >= 400", response)
			return response
		}

		const data = await response.json()
		console.log("🟪➤➤ zxfetch: data:", data)

		return data
	} catch (err) {
		console.log("🟪❌❌ zxfetch: catch.err ", err)
		return { error: err }
	}
}

export async function apiLocationSearch({ searchText }) {
	// https://adresse.data.gouv.fr/api-doc/adresse

	try {
		const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${searchText}&limit=10`)
		console.log("🟪 zxfetch: response:", response)

		if (response?.statusCode >= 400 || response?.status >= 400) {
			console.error("🟪❌ zxfetch: response.statusCode >= 400", response)
			return response
		}

		const data = await response.json()
		console.log("🟪➤➤ zxfetch: data:", data)

		return data
	} catch (err) {
		console.log("🟪❌❌ zxfetch: catch.err ", err)
		return { error: err }
	}
}




/**
 * @usedIn 	PageUserEditLocation
 */
export const useFetchUserLocation = (userId) => {
	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [errorResponse, setErrorResponse] = useState(null)

	useEffect(() => {
		setIsLoading(true)
		setUser(null)
		zxFetch({
			shortUrl: "/users/" + userId + "/location-infos",
			method: "GET",
		}).then((response) => {
			if (response.user) {
				setUser(response.user)
			} else {
				setErrorResponse(response)
			}
			setIsLoading(false)
		})
	}, [userId])

	return { user, setUser, isLoading, errorResponse }
}

/**
 * @usedIn 	PageUserEditLocation
 */
export const useFetchGetIpCoords = () => {
	// * {ip} from `api.ipgeolocation.io`
	// * then {latitude, longitude, city} from api
	const [ipCoords, setIpCoords] = useState(null)

	const [isLoading, setIsLoading] = useState(false)
	const [errorResponse, setErrorResponse] = useState(null)

	useEffect(() => {
		setIpCoords(null)
		setIsLoading(true)
		axios
			.get("https://api.ipify.org/?format=json")
			.then(function (response) {
				console.log("api.ipify.org::response.data", response.data)
				if (response.data?.ip) setIpCoords({ ip: response.data.ip })
			})
			.catch(function (error) {
				console.log(error)
				setErrorResponse(error)
			})
			.finally(function () {
				setIsLoading(false)
			})
	}, [])

	useEffect(() => {
		if (!ipCoords || !ipCoords.ip) return

		const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${IPGEOLOCATION_API_KEY}&ip=${ipCoords.ip}&output=xml`
		console.log("----------------- url", url)
		axios
			.get(url)
			.then(function (response) {
				if (response.data) {
					console.log("api.ipgeolocation.io::response.data", response.data)
					setIpCoords({
						...ipCoords,
						latitude: response.data.latitude,
						longitude: response.data.longitude,
						city: response.data.city,
					})
				}
			})
			.catch(function (error) {
				console.log("error", error)
			})
			.finally(function () {
				// always executed
			})
	}, [ipCoords])

	return { ipCoords, setIpCoords, isLoading, errorResponse }
}
