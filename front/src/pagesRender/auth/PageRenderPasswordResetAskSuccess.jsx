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
 *	@compomentName		PageRenderPasswordResetAskSuccess
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
 *	@author		dfleury
 *
 *	// @updatedby	lamine
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"

import "./auth.scss"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageRenderPasswordResetAskSuccess({ email, debugPasswordResetToken }) {
	return (
		<div className="AppPage">
			<header id="AppPageHeader" className="p-4">
				<h1>Votre demade de reinitialisation de mot de passe a bien été enregistrée.</h1>
			</header>

			<div id="AppPageContent" className="p-4">
				<p className="alert alert-success">
					Un email avec les instructions pour réinitialiser votre mot de passe a été envoyé à l'adresse{" "}
					<b>{email}</b>.
				</p>
				{debugPasswordResetToken && (
					<p>
						<a
							href={"http://localhost:3009/auth/password/reset/update/" + debugPasswordResetToken}
							target="_blank"
							rel="noreferrer"
						>
							📛 DEBUG ONLY: Lien-Validation 📛
						</a>
					</p>
				)}
			</div>
		</div>
	)
}
