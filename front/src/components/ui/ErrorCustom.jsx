// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function ErrorCustom({ response }) {
	if (!response) return <>NULL</>

	let errorMessage = "ERREUR INCONNUE ???"

	if (response.error?.message) errorMessage = "ERREUR INCONNUE"
	else if (response.error) {
		switch (response.error) {
			case "USERNAME_ALREADY_EXISTS":
				errorMessage = "Ce nom d'utilisateur est déjà utilisé"
				break
			case "EMAIL_ALREADY_EXISTS":
				errorMessage = "Cette adresse e-mail est déjà utilisée"
				break
			case "INVALID_PASSWORD":
				errorMessage = "Mot de passe incorrect"
				break
			case "USER_NOT_FOUND":
				errorMessage = "Utilisateur non trouvé"
				break
			case "INVALID_USERNAME_FORMAT":
				errorMessage =
					"Le nom d'utilisateur doit contenir de 3 à 16 caractères alphanumériques, tirets ou underscores"
				break
			case "INVALID_EMAIL_FORMAT":
				errorMessage = "L'e-mail n'est pas dans un format valide."
				break
			case "CANT_CHAT_IF_NOT_MATCHING":
				errorMessage = "Pas de Match, pas de chat!"
				break
			case "CANT_CHAT_IF_BLOCKING":
				errorMessage = "Vous etes ke-blo!"
				break
			case "EMAIL_NOT_CONFIRMED":
				errorMessage = "eMail non confirmé - Check ta boite mail"
				break
			case "INVALID_TOKEN":
				errorMessage = <>Token invalide. Reconnecte-toi !</>
				break
			case "NOT_ENOUGH_TAGS":
				errorMessage = (
					<>
						Vous devez choisir au moins 5 centres d'interet pour faire une recherche.
						<br />
						Modifiez votre profil!
					</>
				)
				break
			case "NO_GPS_COORDINATES":
				errorMessage = (
					<>
						Vous devez indiquer votre position geographique pour faire une recherche.
						<br />
						Modifiez votre profil!
					</>
				)
				break
			case "SUPER_PASSWORD_MISSING":
				errorMessage = "Vous n'avez pas définie de SuperPassword."
				break
			case "INVALID_SUPER_PASSWORD":
				errorMessage = "Le SuperPassword que vous avez saisie est incorrect."
				break
			default:
				errorMessage = (
					<>
						ERREUR INCONNUE
						<br />
						<p className="text-warning">"{response.error}"</p>
					</>
				)
		}
	} else
		errorMessage = (
			<>
				Erreur Inconnue
				{/*
				<br />
				<div className="text-warning">
					{response.status && <div> status: "{response.status}"</div>}
					{response.statusCode && <div> statusCode: "{response.statusCode}"</div>}
					{response.statusText && <div> statusText: "{response.statusText}"</div>}
				</div>
				*/}
			</>
		)

	return (
		<div className="border border-danger p-1 m-1 text-danger">
			<h2 className="text-danger p-0 m-0">{errorMessage}</h2>
		</div>
	)
}
