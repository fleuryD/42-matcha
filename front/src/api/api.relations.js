// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import zFetch from "../utils/zFetch"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// * ■■■■■■■■■■■■■■■■■■■■■ LIKE

export async function apiLikeUser({ userId }) {
	return zFetch({
		shortUrl: "/relations/like-user/" + userId,
		method: "GET",
		requierdFields: [],
	})
}
export async function apiUnLikeUser({ userId }) {
	return zFetch({
		shortUrl: "/relations/unlike-user/" + userId,
		method: "GET",
		requierdFields: [],
	})
}

// * ■■■■■■■■■■■■■■■■■■■■■ BLOCK

export async function apiBlockUser({ userId }) {
	return zFetch({
		shortUrl: "/relations/block-user/" + userId,
		method: "GET",
		requierdFields: [],
	})
}
export async function apiUnBlockUser({ userId }) {
	return zFetch({
		shortUrl: "/relations/unblock-user/" + userId,
		method: "GET",
		requierdFields: [],
	})
}

// * ■■■■■■■■■■■■■■■■■■■■■ FAKE

export async function apiFakeUser({ userId }) {
	return zFetch({
		shortUrl: "/relations/fake-user/" + userId,
		method: "GET",
		requierdFields: [],
	})
}
export async function apiUnFakeUser({ userId }) {
	return zFetch({
		shortUrl: "/relations/unfake-user/" + userId,
		method: "GET",
		requierdFields: [],
	})
}

// * ■■■■■■■■■■■■■■■■■■■■■
