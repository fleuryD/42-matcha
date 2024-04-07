// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { useAppDispatch } from "store/store"
import { Button } from "react-bootstrap"
import { authLoginSuccess } from "store/authSlice"
import { apiFetchDebugQuickLoginLogin } from "api"
import { IcoAdmin } from "components/ui/zIcones"
import { useAppSelector } from "store/store"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function UserButtonQuickLogAs({ username, refresh = false, className = "" }) {
	const dispatch = useAppDispatch()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)
	const { superPassword } = useAppSelector((state) => state.auth)
	// const { modeDev } = useAppSelector((state) => state.auth)

	// if (!modeDev) return

	function btClick(username) {
		setIsLoading(true)

		console.log("username", username)

		setError(null)
		apiFetchDebugQuickLoginLogin({ username, superPassword }).then((response) => {
			if (response.user) {
				dispatch(authLoginSuccess(response.user))
				if (refresh) window.location.reload()
			} else if (response.error) {
				if (response.error === "INVALID_PASSWORD") setError("Mot de passe incorrect")
				else if (response.error === "USER_NOT_FOUND") setError("Utilisateur non trouvé")
				else if (response.error === "EMAIL_NOT_CONFIRMED") setError("email non confirmé - Check ta boite mail")
				else {
					console.error("response.error: ", response.error)
					setError("Erreur Inconnue: Voir la console")
				}
			} else {
				console.error("response: ", response)
				setError("Erreur Inconnue: Voir la console")
			}
			setIsLoading(false)
		})
	}

	if (error) return "ERROR"
	if (isLoading) return "Loading...."

	return (
		<Button onClick={() => btClick(username)} disabled={isLoading} variant="danger" className={className}>
			<IcoAdmin /> QuickLog
		</Button>
	)
}
