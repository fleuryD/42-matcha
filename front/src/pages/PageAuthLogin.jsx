// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { authLoginSuccess } from "store/authSlice"
import { useAppDispatch } from "store/store"
import { apiFetchLogin } from "api"
import { validateFormLogin } from "components/forms/userFormHelpers"
import PageRenderLogin from "pagesRender/auth/PageRenderLogin"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageAuthLogin() {
	const dispatch = useAppDispatch()

	const [emailOrUsername, setEmailOrUsername] = useState("")
	const [password, setPassword] = useState("")

	const [isLoading, setIsLoading] = useState(false)
	const [frontErrors, setFrontErrors] = useState({})
	const [errorResponse, setErrorResponse] = useState(null)

	const btLoginClick = async () => {
		if (validateFormLogin(emailOrUsername, password, frontErrors, setFrontErrors) > 0) return
		setIsLoading(true)
		setErrorResponse(null)
		apiFetchLogin({ emailOrUsername, password }).then((response) => {
			if (response.user) {
				dispatch(authLoginSuccess(response.user))
				window.location.href = "users/" + response.user.id
			} else setErrorResponse(response)
			setIsLoading(false)
		})
	}
	// ****  RENDER  ***********************************************************
	return (
		<PageRenderLogin
			emailOrUsername={emailOrUsername}
			setEmailOrUsername={setEmailOrUsername}
			password={password}
			setPassword={setPassword}
			isLoading={isLoading}
			errorResponse={errorResponse}
			frontErrors={frontErrors}
			setFrontErrors={setFrontErrors}
			btLoginClick={btLoginClick}
		/>
	)
}
