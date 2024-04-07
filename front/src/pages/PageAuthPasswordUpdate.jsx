// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { apiPasswordResetUpdate } from "api"
import { validateFormPasswordResetUpdate } from "components/forms/userFormHelpers"
//import { Link } from "react-router-dom"
import ZLoading from "components/ui/ZLoading"
import PageRenderPasswordUpdateSuccess from "pagesRender/auth/PageRenderPasswordUpdateSuccess"
import PageRenderPasswordUpdate from "pagesRender/auth/PageRenderPasswordUpdate"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageAuthPasswordUpdate() {
	const [user, setUser] = useState({
		email: "",
		password: "",
		password2: "",
		passwordResetToken: useParams().passwordToken,
	})

	const [isLoading, setIsLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [frontErrors, setFrontErrors] = useState({})
	const [fetchErrorResponse, setFetchErrorResponse] = useState(null)

	const btUpdatePasswordClick = async () => {
		setFetchErrorResponse(null)
		setFrontErrors({})

		if (validateFormPasswordResetUpdate(user, frontErrors, setFrontErrors) > 0) return
		setIsLoading(true)

		apiPasswordResetUpdate(user).then((response) => {
			if (response.success) {
				setIsSuccess(true)
			} else {
				setFetchErrorResponse(response)
			}
			setIsLoading(false)
		})
	}

	// ■■■■■■■■■■■■■■■■■■■■■■■■ xxxxxxxxxxxxxx ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

	if (isSuccess) return <PageRenderPasswordUpdateSuccess email={user.email} />

	return (
		<PageRenderPasswordUpdate
			isLoading={isLoading}
			user={user}
			setUser={setUser}
			fetchErrorResponse={fetchErrorResponse}
			frontErrors={frontErrors}
			setFrontErrors={setFrontErrors}
			btUpdatePasswordClick={btUpdatePasswordClick}
		/>
	)
}
