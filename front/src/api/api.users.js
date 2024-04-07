// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { useState, useEffect } from "react"
//import { API_BASE_URL /* , getUserToken */ } from "./constants" // ?????????????????
import zFetch from "../utils/zFetch"
import zxFetch from "../utils/zxFetch"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// * ■■■■■■■■■■■■■■■■■■■■■ USERS

// * ■■■■■■■■■■■■■■■■■■■■■

/**
 * @usedIn 	PageUserEdit
 */
export async function apiUpdatetUser(user) {
	return zxFetch({
		shortUrl: "/users/" + user.id + "/update",
		method: "POST",
		body: { user },
	})
}
/**
 * @usedIn 	PageUserEditLocation
 */
export async function apiUpdatetUserLocation(user) {
	return zxFetch({
		shortUrl: "/users/" + user.id + "/update/location",
		method: "POST",
		body: { user },
	})
}

/**
 * @usedIn 	....
 */

export async function apiGetUser(userId) {
	return zxFetch({
		shortUrl: "/users/" + userId,
		method: "GET",
	})
}

/**
 * @usedIn 	PageUserProfil
 */
export const useFetchGetUser = ({ userId }) => {
	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [errorResponse, setErrorResponse] = useState(null)

	useEffect(() => {
		setIsLoading(true)
		setUser(null)
		zxFetch({
			shortUrl: "/users/" + userId,
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
 * @usedIn 	PageAdmin (fixtures + quick log)
 */
export async function apiGetUsersForAdminDashboard(filters, isConnected, superPassword) {
	console.log("apiUploadImage")
	return zxFetch({
		shortUrl: "/users/admin",
		method: "POST",
		body: { superPassword, filters },
		publicAccess: !isConnected,
	})
}

/**
 * @usedIn 	PageUsersBrowsing
 */
export async function apiGetUsersForExplorer(filters) {
	console.log("filtersfiltersfiltersfiltersfilters", filters)
	return zxFetch({
		shortUrl: "/users/explorer",
		method: "POST",
		body: { filters },
	})
}

// deprecated / unused
/**
 * @usedIn 	PageUsersSearch
 */
export async function apiGetUsersForSearch(filters) {
	return zxFetch({
		shortUrl: "/users/search",
		method: "POST",
		body: { filters },
	})
}
