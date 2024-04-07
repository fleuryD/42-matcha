// ### DOCUMENTATION ############################################################

// ### IMPORTS ##################################################################

import { API_BASE_URL /* , getUserToken */ } from "./constants" // ?????????????????
//import errorManager from "./errorManager"

// ### TYPES ####################################################################

// ### FUNCTIONS ################################################################

// 🟥🟧🟨🟩🟦🟪⬛️⬜️🟫

export default async function zFetch({ shortUrl, method, requierdFields, body, publicAccess }) {
	const url = API_BASE_URL + shortUrl
	console.log("🟨 zFetch ➤➤ url:", url)

	const requestOptions = {
		method,
		headers: publicAccess ? requestOptionsHeadersPublic() : requestOptionsHeaders(),
		body: body ? JSON.stringify(body) : null,
	}

	// console.log("🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦:", requestOptions)

	try {
		const response = await fetch(url, requestOptions)
		const rep = await response.json()

		const missingElements = []

		if (rep?.statusCode >= 400) {
			let returnErrorMessage = "Erreur: "
			console.log("❌ rep.statusCode:", rep.statusCode)
			console.log("❌ rep.message:", rep.message)
			console.log("❌ rep:", rep)
			return { error: returnErrorMessage }
		}

		requierdFields.forEach((elem) => {
			if (!rep[elem]) {
				missingElements.push(elem)
			}
		})

		if (missingElements.length === 0) {
			console.log("🟩 zFetch.success ➤➤ rep:", rep)
			return rep
		}

		console.log("❌ missingElements", missingElements)
		return { error: rep }
	} catch (err) {
		return { error: err }
	}
}

// ### PRIVATE ################################################################

function requestOptionsHeaders() {
	return {
		"Content-Type": "application/json",
		Accept: "application/json",
		Authorization: "Bearer " + localStorage.getItem("access_token"),
	}
}
function requestOptionsHeadersPublic() {
	return {
		"Content-Type": "application/json",
		Accept: "application/json",
	}
}
