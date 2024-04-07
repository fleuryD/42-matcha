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
 *	@compomentName		PageRenderPasswordUpdate
 *
 *
 *	@description
 *		Apres avoir fait une demande pour reinitialiser son mot de passe (`PageRenderPasswordResetAsk`),
 *		on recoit un mail avec un lien vers cette page
 *		on doit saisir son email et le nouveau mot de passe
 *
 *
 *	@usedIn
 *		- `xxxxxxxxxx/xxxxxxxxxxxxxxxx`
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
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"
import { Button } from "react-bootstrap"
import ZLoading from "components/ui/ZLoading"
import Form from "react-bootstrap/Form"

import ZFormInput from "components/ui/ZFormInput"
import ErrorCustom from "components/ui/ErrorCustom"

import "./auth.scss"

// *■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageRenderPasswordUpdate({
	isLoading,
	user,
	setUser,
	fetchErrorResponse,
	frontErrors,
	setFrontErrors,
	btUpdatePasswordClick,
}) {
	return (
		<div className="AppPage" id="PagePasswordUpdate">
			<header id="AppPageHeader">
				<h1>Modifiez votre mot de passe</h1>
			</header>

			{isLoading && <ZLoading />}

			<div id="AppPageContent">
				<Form className="ZForm row col-12 bg-light mb-3">
					<ZFormInput
						type="email"
						name="email"
						label="e-mail"
						placeholder="e-mail"
						value={user.email}
						setValue={(val) => setUser({ ...user, email: val })}
						error={frontErrors?.email}
						resetError={() => setFrontErrors((errors) => ({ ...errors, email: null }))}
						isLoading={isLoading}
					/>
					<ZFormInput
						type="password"
						name="password"
						label="Mot de passe"
						placeholder="Mot de passe"
						value={user.password}
						setValue={(val) => setUser({ ...user, password: val })}
						error={frontErrors?.password}
						resetError={() => setFrontErrors((errors) => ({ ...errors, password: null }))}
						isLoading={isLoading}
					/>
					<ZFormInput
						type="password"
						name="password2"
						label="Repete le password"
						placeholder="Repete le password"
						value={user.password2}
						setValue={(val) => setUser({ ...user, password2: val })}
						error={frontErrors?.password2}
						resetError={() => setFrontErrors((errors) => ({ ...errors, password2: null }))}
						isLoading={isLoading}
					/>

					{fetchErrorResponse && <ErrorCustom response={fetchErrorResponse} />}

					<div>
						<Button
							variant="primary"
							className="float-end"
							onClick={() => btUpdatePasswordClick()}
							disabled={isLoading}
						>
							Modifier mon mot de passe
						</Button>
					</div>
				</Form>
			</div>
		</div>
	)
}
