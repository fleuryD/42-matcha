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
 *	@compomentName		PageRenderPasswordUpdateSuccess
 *
 *
 *	@description
 *		Message de confirmation quand le mot de passe a bien été modifié
 *
 *
 *	@usedIn
 *		- `pages/PageAuthPasswordUpdate`
 *
 *
 *
 *	@author		dfleury
 *
 *
 *	@styles
 *		- `styles/global.scss`
 *		- `styles/auth.scss` (vide)
 *		- `styles/form.scss`
 *
 *	// @updatedby	lamine
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"
import { Link } from "react-router-dom"

import "./auth.scss"

// *■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageRenderPasswordUpdateSuccess({ email }) {
	return (
		<div className="AppPage">
			<header id="AppPageHeader">
				<h1>Votre mot de passe a bien été modifié.</h1>
			</header>

			<div id="AppPageContent">
				<p className="alert alert-success">
					Vous pouvez vous <Link to="/">CONNECTER</Link> avec l'adresse <b>{email}</b> et votre nouveau mot de
					passe.
				</p>
			</div>
		</div>
	)
}
