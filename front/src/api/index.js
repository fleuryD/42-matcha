// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import zFetch from "../utils/zFetch"
import zxFetch from "../utils/zxFetch"
import axios from "axios"

import {
	apiFetchRegister,
	apiPasswordResetAsk,
	apiPasswordResetUpdate,
	apiFetchLogin,
	apiFetchCheckEmail,
	apiFetchDebugQuickLoginLogin,
} from "./api.auth"

import { apiLikeUser, apiUnLikeUser, apiBlockUser, apiUnBlockUser, apiFakeUser, apiUnFakeUser } from "./api.relations"

import { apiFetchTags, apiFetchMyTags, apiAddTag, apiRemoveTag } from "./api.tags"
import {
	apiGetUser,
	//apiGetUserForEditLocation,
	//apiDebugFetchUsers,
	apiUpdatetUser,
	apiUpdatetUserLocation,
	apiGetUsersForExplorer,
	apiGetUsersForSearch,
	apiGetUsersForAdminDashboard,
	useFetchGetUser,
} from "./api.users"

import { API_BASE_URL /* , getUserToken */ } from "../utils/constants" // ?????????????????

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export {
	// *** Auth:
	apiFetchRegister,
	apiFetchLogin,
	apiFetchCheckEmail,
	apiFetchDebugQuickLoginLogin,
	apiPasswordResetAsk,
	apiPasswordResetUpdate,

	// *** Relations: Likes:
	apiLikeUser,
	apiUnLikeUser,
	// *** Relations: Blocks:
	apiBlockUser,
	apiUnBlockUser,
	// *** Relations: Fakes:
	apiFakeUser,
	apiUnFakeUser,

	// *** Tags:
	apiFetchTags,
	apiFetchMyTags,
	apiAddTag,
	apiRemoveTag,

	// *** Users:
	apiGetUser,
	//apiGetUserForEditLocation,
	apiUpdatetUser,
	apiUpdatetUserLocation,
	apiGetUsersForExplorer,
	apiGetUsersForSearch,
	apiGetUsersForAdminDashboard,
	useFetchGetUser,
}

// * ■■■■■■■■■■■■■■■■■■■■■

export async function apiFetchTest() {
	return zFetch({ shortUrl: "/test", method: "GET", requierdFields: [] })
}

// * ■■■■■■■■■■■■■■■■■■■■■ FIXTURES

export async function apiFixtures(genre, superPassword = null) {
	return zFetch({
		shortUrl: "/admin/fixtures/" + genre,
		method: "POST",
		body: {
			superPassword,
		},
		requierdFields: [],
	})
}
export async function apiFixturesRelations(superPassword = null) {
	return zFetch({
		shortUrl: "/admin/fixtures/relations",
		method: "POST",
		body: {
			superPassword,
		},
		requierdFields: [],
	})
}

// * ■■■■■■■■■■■■■■■■■■■■■ CHAT

export async function apiSendMessage({ targetId, content }) {
	return zxFetch({
		shortUrl: "/chat/send-message",
		method: "POST",
		body: { targetId, content },
	})
}

// * ■■■■■■■■■■■■■■■■■■■■■ UPLOADS IMAGES
/*
export async function apiUploadImage(file) {
	console.log("apiUploadImageccc")
	console.log("dDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD", file)

	/*
	const formData = new FormData()
	formData.append("image", file)

	const result = await axios.post("/api/images", formData, { headers: { "Content-Type": "multipart/form-data" } })
	console.log(result.data)
	return result.data
	* /

	return zFetch({
		shortUrl: "/users/upload-image",
		method: "POST",
		body: { image: file, description: "DESSSCCCSCSFFITPN" },
		requierdFields: [],
	})
}
*/

export async function apiUploadImage(formData, imageNumber) {
	const url = API_BASE_URL + "/images/upload-image/" + imageNumber
	/*
	const response = await axios
		.post(url, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Accept: "application/json",
				Authorization: "Bearer " + localStorage.getItem("access_token"),
			},
		})
		.then((response) => {
			console.log("response", response)
			//return { response }
		})
		.catch((error) => {
			//return { response: error }
		})

	return response
	*/
	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "multipart/form-data",
			Accept: "application/json",
			Authorization: "Bearer " + localStorage.getItem("access_token"),
		},
		//body: JSON.stringify({ description: "DESSSCCCSCSFFITPN" }),
		//body: { description: "DESSSCCCSCSFFITPN" },
		body: formData,
		//body: JSON.stringify(formData),
	}

	try {
		const response = await fetch(url, requestOptions)
		console.log("response", response)
		//const rep = await response.json()

		return { response }
	} catch (err) {
		return { error: err }
	}
}

// * ■■■■■■■■■■■■■■■■■■■■■
export async function apiMarkAllNotificationAsRead() {
	return zxFetch({
		shortUrl: "/notifications/mark-all-as-read/",
		method: "GET",
		requierdFields: [],
	})
}

