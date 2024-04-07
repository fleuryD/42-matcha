// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import zFetch from "../utils/zFetch"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// * ■■■■■■■■■■■■■■■■■■■■■ TAGS

export async function apiFetchTags() {
	return zFetch({
		shortUrl: "/tags/",
		method: "GET",
		requierdFields: [],
	})
}

export async function apiFetchMyTags() {
	return zFetch({
		shortUrl: "/tags/my-tags",
		method: "GET",
		requierdFields: [],
	})
}

export async function apiAddTag({ tagId }) {
	return zFetch({
		shortUrl: "/tags/add/" + tagId,
		method: "GET",
		requierdFields: [],
	})
}
export async function apiRemoveTag({ tagId }) {
	return zFetch({
		shortUrl: "/tags/remove/" + tagId,
		method: "GET",
		requierdFields: [],
	})
}

// * ■■■■■■■■■■■■■■■■■■■■■
