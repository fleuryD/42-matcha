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
 *	@compomentName		PageRenderEditMyEmailSuccess
 *
 *
 *	@description
 *		Après avoir editer son profil, si l'utilisateur a modifié son adresse
 *		email, un email_token est généré sur le backend et un mail est envoyé à
 *		la nouvelle adresse.
 *
 *		Cette page s'affiche pour comfirmer la modification et rappeler de
 *		consulter ses mails.
 *
 *
 *
 *
 *	@usedIn
 *		- `pages/PageCXXXXXXXXXXXXXXX`
 *
 *
 *
 *	@styles
 *		- `styles/auth.scss` (vide)
 *
 *
 *	@author		dfleury
 *
 *
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"
import { useParams } from "react-router-dom"

import "./auth.scss"

// *■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageRenderEditMyEmailSuccess() {
	const email = useParams().email || ""

	return (
		<div id="PageRegister" className="AppPage">
			<header id="AppPageHeader">
				<h1>Profil modifié avec succès !</h1>
			</header>

			<div id="AppPageContent" className="d-flex align-items-center justify-content-center">
				<p>
					Vous avez modifié votre adresse email.
					<br />
					Un email avec les instructions à suivre a été envoyé à: <b>{email}</b>.
				</p>
			</div>
		</div>
	)
}
