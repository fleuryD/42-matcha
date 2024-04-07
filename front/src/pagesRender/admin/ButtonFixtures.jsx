/**
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 **■                                                                           ■
 **■                                                        :::      ::::::::  ■
 **■                                                       :+:      :+:    :+: ■
 **■                     | |       | |                  +:+ +:+         +:+    ■
 **■    _ __ ___    __ _ | |_  ___ | |__    __ _      +#+  +:+       +#+       ■
 **■   | '_ ` _ \  / _` || __|/ __|| '_ \  / _` |   +#+#+#+#+#+   +#+          ■
 **■   | | | | | || (_| || |_| (__ | | | || (_| |        #+#    #+#            ■
 **■   |_| |_| |_| \__,_| \__|\___||_| |_| \__,_|       ###   ########.fr      ■
 **■                                                                           ■
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 *
 *	@compomentName		Xxxxxxxxxxxxxxxxxx
 *
 *
 *	@description
 *		xxxxxxxxxxxxxxxxxxxxxxxx
 *		xxxxxxxxxxxxxxxxxxxxxxxx
 *		xxxxxxxxxxxxxxxxxxxxxxxx
 *		xxxxxxxxxxxxxxxxxxxxxxxx
 *		xxxxxxxxxxxxxxxxxxxxxxxx
 *
 *
 *	@usedIn
 *		- `xxxxxxxxxx/xxxxxxxxxxxxxxxx`
 *
 *
 *
 *	@author		dfleury
 *
 *	// @updatedby	lamine
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React, { useState } from "react"
import { useAppDispatch } from "store/store"
import { authLogoutSuccess } from "store/authSlice"
import { Button } from "react-bootstrap"
import { apiFixtures } from "api"
import { useAppSelector } from "store/store"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function ButtonFixtures({ txt, genre, isLoading, setIsLoading }) {
	const dispatch = useAppDispatch()
	const { superPassword } = useAppSelector((state) => state.auth)
	const [error, setError] = useState(null)

	function btClick() {
		setIsLoading(true)
		setError(null)
		apiFixtures(genre, superPassword).then((response) => {
			if (response.error) {
				if (response.error === "INVALID_PASSWORD") setError("Mot de passe incorrect")
				else {
					console.error("response.error: ", response.error)
					setError("Erreur Inconnue: Voir la console")
				}
			} else {
				console.log("response: ", response)
				if (genre === "delete-all-from-all-tables") dispatch(authLogoutSuccess())
				window.location.reload()
			}

			setIsLoading(false)
		})
	}

	if (error) return "ERROR"

	return (
		<Button
			className="m-2"
			onClick={() => btClick()}
			disabled={isLoading}
			variant={isLoading ? "secondary" : "primary"}
		>
			Fixtures:: {txt}
		</Button>
	)
}
