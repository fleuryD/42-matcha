// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiFetchCheckEmail } from "api"
import PageRenderCheckEmail from "pagesRender/auth/PageRenderCheckEmail"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageAuthCheckEmail() {
	const emailToken = useParams().emailToken

	const [errorMessage, setErrorMessage] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [success, setSuccess] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		setSuccess(false)
		setErrorMessage(null)

		apiFetchCheckEmail({ emailToken }).then((response) => {
			if (response.success) {
				setSuccess(true)
			} else {
				console.log("response: ", response)
				setErrorMessage("Erreur Inconnue")
			}
		})

		setIsLoading(false)
	}, [emailToken])

	return <PageRenderCheckEmail isLoading={isLoading} errorMessage={errorMessage} success={success} />
}
