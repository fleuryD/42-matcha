// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { format, parseISO } from "date-fns"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import { NotificationManager } from "react-notifications"

import { apiGetUser, apiUpdatetUser } from "api"
import { useAppSelector, useAppDispatch } from "store/store"
import { authLoginSuccess, authLogoutSuccess } from "store/authSlice"
import PageRenderEditMyProfil from "pagesRender/auth/PageRenderEditMyProfil"
import { validateFormUserEdit } from "components/forms/userFormHelpers"
import ErrorCustom from "components/ui/ErrorCustom"
import ZLoading from "components/ui/ZLoading"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageUserEdit() {
	const dispatch = useAppDispatch()
	const userId = Number(useParams().id) || 0
	const auth = useAppSelector((state) => state.auth)
	const navigate = useNavigate()

	const [user, setUser] = useState(null)

	const [isLoadingGet, setIsLoadingGet] = useState(true)
	const [fetchErrorResponseGet, setFetchErrorResponseGet] = useState(null)

	const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
	const [frontErrors, setFrontErrors] = useState({})
	const [fetchErrorResponseUpdate, setFetchErrorResponseUpdate] = useState(null)

	// * fetch user's data
	useEffect(() => {
		if (userId > 0) {
			setUser(null)
			setIsLoadingGet(true)
			setFetchErrorResponseGet(null)

			apiGetUser(userId).then((response) => {
				if (response.user) {
					setUser({
						...response.user,
						birthday: response.user.birthday
							? format(parseISO(response.user.birthday), "yyyy-MM-dd")
							: null,
						loveM: response.user.love_m,
						loveF: response.user.love_f,
						loveNB: response.user.love_nb,
						cgu: false,
					})
				} else {
					setFetchErrorResponseGet(response)
				}
				setIsLoadingGet(false)
			})
		}
	}, [auth.id, dispatch, userId])

	const btEditClick = async () => {
		setFetchErrorResponseUpdate(null)
		setFrontErrors({})

		if (validateFormUserEdit(user, frontErrors, setFrontErrors) > 0) return
		setIsLoadingUpdate(true)
		apiUpdatetUser(user).then((response) => {
			if (response.success) {
				if (response.user) {
					if (user.email === auth.email) {
						dispatch(authLoginSuccess(response.user))
						navigate("/users/" + userId)
						NotificationManager.success("Votre profil a été modifié avec succès !", null, 10000)
					} else {
						dispatch(authLogoutSuccess())
						navigate("/auth/edit-my-email-success/" + response.user.email)
						//NotificationManager.success("Votre profil a été modifié avec succès. Consultez vos mails pour valider votre nouvelle adresse.", null, 30000)
					}
				}
			} else {
				setFetchErrorResponseUpdate(response)
			}
			setIsLoadingUpdate(false)
		})
	}

	// **** RENDER: LOADING, ERROR:

	if (auth.id !== userId) return <h1>This is not your profile, you can't edit it !</h1>

	if (fetchErrorResponseGet) return <ErrorCustom response={fetchErrorResponseGet} />

	if (isLoadingGet) return <ZLoading />

	if (!user) return <p>Ni Loading, ni error, ni user (ne devrait pas arriver)</p>

	// **** RENDER: EDIT MY PROFIL:

	return (
		<PageRenderEditMyProfil
			user={user}
			setUser={setUser}
			isLoading={isLoadingUpdate}
			frontErrors={frontErrors}
			setFrontErrors={setFrontErrors}
			fetchErrorResponse={fetchErrorResponseUpdate}
			btEditClick={btEditClick}
		/>
	)
}
