// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { apiFetchRegister } from "api"
import { useAppSelector } from "store/store"
import { validateFormUserRegistration } from "components/forms/userFormHelpers"
//import logo from "../logo.svg"
import PageRenderRegister from "pagesRender/auth/PageRenderRegister"
import PageRenderRegisterSuccess from "pagesRender/auth/PageRenderRegisterSuccess"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageAuthRegister() {
	const [user, setUser] = useState({
		username: "",
		email: "",
		firstname: "",
		lastname: "",
		password: "",
		password2: "",
		birthday: "",
		biography: "",
		gender: "",
		loveM: false,
		loveF: false,
		loveNB: false,
		cgu: false,
	})
	
	const { modeDev } = useAppSelector((state) => state.auth)
	const [isLoading, setIsLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [frontErrors, setFrontErrors] = useState({})
	const [fetchErrorResponse, setFetchErrorResponse] = useState(null)
	const [debugEmailToken, setDebugEmailToken] = useState(null)

	const btRegisterClick = async () => {
		setDebugEmailToken(null)
		setFetchErrorResponse(null)
		setFrontErrors({})

		if (validateFormUserRegistration(user, frontErrors, setFrontErrors) > 0) return

		apiFetchRegister(user).then((response) => {
			if (response.success) {
				if (response.emailToken) setDebugEmailToken(response.emailToken)
				setIsSuccess(true)
			} else {
				setFetchErrorResponse(response)
			}
			setIsLoading(false)
		})
	}

	// ■■■■■■■■■■■■■■■■■■■■■■■■ xxxxxxxxxxxxxx ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

	if (isSuccess) {
		return <PageRenderRegisterSuccess email={user.email} debugEmailToken={debugEmailToken} modeDev={modeDev}/>
	}

	return (
		<PageRenderRegister
			user={user}
			setUser={setUser}
			isLoading={isLoading}
			frontErrors={frontErrors}
			setFrontErrors={setFrontErrors}
			fetchErrorResponse={fetchErrorResponse}
			btRegisterClick={btRegisterClick}
		/>
	)
}
