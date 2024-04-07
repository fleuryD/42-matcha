// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"

import { apiPasswordResetAsk } from "api"
import { validateFormResetPasswordAsk } from "components/forms/userFormHelpers"
//import ZLoading from "components/ui/ZLoading"
import PageRenderPasswordResetAsk from "pagesRender/auth/PageRenderPasswordResetAsk"
import PageRenderPasswordResetAskSuccess from "pagesRender/auth/PageRenderPasswordResetAskSuccess"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageAuthPasswordResetAsk() {
	const [email, setEmail] = useState("")

	const [isLoading, setIsLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [frontErrors, setFrontErrors] = useState({})
	const [fetchErrorResponse, setFetchErrorResponse] = useState(null)
	const [debugPasswordResetToken, setDebugPasswordResetToken] = useState(null)

	// ■■■■■■■■■■■■■■■■■■■■■■■■ xxxxxxxxxxxxxx ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

	function btResetPasswordClick() {
		setDebugPasswordResetToken(null)
		setFrontErrors({})
		setFetchErrorResponse(null)

		if (validateFormResetPasswordAsk(email, frontErrors, setFrontErrors) > 0) return

		setIsLoading(true)

		apiPasswordResetAsk(email).then((response) => {
			if (response.success) {
				if (response.passwordResetToken) setDebugPasswordResetToken(response.passwordResetToken)
				setIsSuccess(true)
			} else {
				setFetchErrorResponse(response)
			}
			setIsLoading(false)
		})
	}

	// ************** RENDER ***************************************************

	if (isSuccess)
		return <PageRenderPasswordResetAskSuccess email={email} debugPasswordResetToken={debugPasswordResetToken} />

	return (
		<PageRenderPasswordResetAsk
			isLoading={isLoading}
			email={email}
			setEmail={setEmail}
			frontErrors={frontErrors}
			setFrontErrors={setFrontErrors}
			fetchErrorResponse={fetchErrorResponse}
			btResetPasswordClick={btResetPasswordClick}
		/>
	)
}
