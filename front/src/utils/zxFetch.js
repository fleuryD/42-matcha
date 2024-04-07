// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { API_BASE_URL /* , getUserToken */ } from "./constants" // ?????????????????

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// 🟥🟧🟨🟩🟦🟪⬛️⬜️🟫

export default async function zxFetch({ shortUrl, method, body, publicAccess }) {
	const url = API_BASE_URL + shortUrl

	const requestOptions = {
		method,
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: publicAccess ? null : "Bearer " + localStorage.getItem("access_token"),
		},
		body: body ? JSON.stringify(body) : null,
	}

	console.log("🟪🟪🟪🟪 zxFetch . method:" + method + ",  url:" + url)
	// console.log("🟪 zxFetch . requestOptions::", requestOptions)

	try {
		const response = await fetch(url, requestOptions)

		if (response?.statusCode >= 400 || response?.status >= 400) {
			console.error("🟪❌ zxfetch: response.statusCode >= 400. response=", response)
			return response
		}

		const data = await response.json()
		//console.log("🟪➤➤ zxfetch: data:", data)

		return data
	} catch (err) {
		console.log("🟪❌❌ zxfetch: catch.err ", err)
		return { error: err }
	}
}
