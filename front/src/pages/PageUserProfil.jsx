// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { useAppSelector, useAppDispatch } from "store/store"
import { useFetchGetUser } from "api"
import { useParams } from "react-router-dom"
import { setTags, authSetNotifications } from "store/authSlice"

import { format, parseISO } from "date-fns"

import ZLoading from "components/ui/ZLoading"
import ErrorCustom from "components/ui/ErrorCustom"

import PageRenderMyProfil from "pagesRender/profil/PageRenderMyProfil"
import PageRenderOtherUserProfil from "pagesRender/profil/PageRenderOtherUserProfil"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageUser() {
	const userId = Number(useParams().id) || 0
	const auth = useAppSelector((state) => state.auth)
	const [showTagsForm, setShowTagsForm] = useState(false)
	const dispatch = useAppDispatch()

	// ****  FETCH USER  *************************************************

	const { user, setUser, isLoading, errorResponse } = useFetchGetUser({ userId })

	// ****  UPDATE USER WHEN CLICK ON LIKE/BLOCK/FAKE BUTTON  *****************

	const handleLike = (userId, val) => {
		setUser({ ...user, is_liked_by_me: val })
	}
	const handleBlock = (userId, val) => {
		setUser({ ...user, is_blocked: val })
	}
	const handleFake = (userId, val) => {
		setUser({ ...user, fakedByMe: val })
	}
	const addUserTag = (tag) => {
		const newTags = [...user.tags, tag]
		setUser({ ...user, tags: newTags })
	}

	const deleteAllNotifications = () => {
		//////// setUser({ ...user, notifications: [] })
		dispatch(authSetNotifications([]))
	}

	// ****  RENDER: LOADING, ERROR  *******************************************

	if (errorResponse) return <ErrorCustom response={errorResponse} />
	if (isLoading) return <ZLoading />
	if (!user) return <p>Ni Loading, ni error, ni user (ne devrait pas arriver)</p>

	// **** RENDER: MY PROFIL	************************************************

	console.warn("user", user)

	if (auth.id === userId)
		return (
			<PageRenderMyProfil
				user={user}
				modeDev={auth.modeDev}
				birthdayStr={user.birthday ? format(parseISO(user.birthday), "yyyy-MM-dd") : null}
				showTagsForm={showTagsForm}
				setShowTagsForm={setShowTagsForm}
				addUserTag={addUserTag}
				deleteAllNotifications={deleteAllNotifications}
			/>
		)

	// **** RENDER: OTHER USER PROFIL:

	return (
		<PageRenderOtherUserProfil
			user={user}
			handleLike={handleLike}
			handleFake={handleFake}
			handleBlock={handleBlock}
			modeDev={auth.modeDev}
		/>
	)
}
