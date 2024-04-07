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
 *	@compomentName		PageRenderRegisterSuccess
 *
 *
 *	@description
 *		Après une inscription réussie, cette page est affichée.
 *		Un mail a été envoyé à l'utilisateur pour valider son adresse email.
 *
 *		DEBUG ONLY:
 *		un lien est affiché pour valider l'email sans verification.
 *
 *
 *	@usedIn
 *		- `pages/PageAuthRegister`
 *
 *
 *
 *	@styles
 *		- `styles/auth.scss` (vide)
 *
 *
 *	@author		dfleury
 *
 *	// @updatedby	lamine
 *
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"

import "./auth.scss"

// *■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageRenderRegisterSuccess({ email, debugEmailToken, modeDev }) {
	
	return (
		<div id="PageRegister" className="AppPage">
			<header id="AppPageHeader">
				<h1 className="p-4">Inscription réussie !</h1>
			</header>

			<div id="AppPageContent" className="p-4">
				<div>
					Un email avec les instructions pour confirmer votre inscription a été envoyé à l'adresse{" "}
					<b>{email}</b>.
				</div>
				{debugEmailToken && modeDev && (
					<div>
						<a
							href={"http://localhost:3009/auth/check-email/" + debugEmailToken}
							target="_blank"
							rel="noreferrer"
						>
							📛 DEBUG ONLY: Lien-Validation 📛
						</a>
					</div>
				)}
			</div>
		</div>
	)
}
