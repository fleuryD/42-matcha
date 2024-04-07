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
 *	@compomentName		PageRenderPasswordResetAsk
 *
 *
 *	@description
 *		Sur cette page, l'utilisateur peut demander une modif de password (mot de passe oublié ou changement)
 *		Il doit saisir son adresse email
 *		Un mail lui est envoyé avec un lien pour modifier son mot de passe >> page `PageAuthPasswordUpdate`
 *
 *
 *	@usedIn
 *		- `xxxxxxxxxx/xxxxxxxxxxxxxxxx`
 *
 *
 *
 *	@styles
 *		- `styles/global.scss`
 *		- `styles/auth.scss` (vide)
 *		- `styles/form.scss`
 *
 *
 *	@author		dfleury
 *
 *	// @updatedby	lamine
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"
import ZLoading from "components/ui/ZLoading"
import { Button } from "react-bootstrap"
import Form from "react-bootstrap/Form"
import ZFormGroup from "components/ui/ZFormGroup"
import ErrorCustom from "components/ui/ErrorCustom"

import "./auth.scss"

// *■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageRenderPasswordResetAsk({
	isLoading,
	email,
	setEmail,
	frontErrors,
	setFrontErrors,
	fetchErrorResponse,
	btResetPasswordClick,
}) {
	// ****  RENDER  ***********************************************************

	if (isLoading) return <ZLoading />

	return (
		<div id="PagePasswordResetAsk" className="AppPage">
			{/*
			<header id="AppPageHeader">
						<h1>Mot de passe oublié ou Changer de mot de passe</h1>
			</header>
			*/}

			<div id="PagePasswordResetAsk" className="d-flex align-items-center justify-content-center">
				<Form className="ZForm row col-sm-12 col-md-10 col-lg-8 col-xl-6 col-xxl-4 ">
					<div className="ZFormHeader">
						<h1>Mot de passe oublié ou Changer de mot de passe</h1>
						<p>Un eMail te sera envoyé avec les instructions pour modifier ton mot de passe.</p>
					</div>

					<ZFormGroup
						type="email"
						name="email"
						value={email}
						setValue={setEmail}
						error={frontErrors?.email}
						resetError={() => setFrontErrors((errors) => ({ ...errors, email: null }))}
						isLoading={isLoading}
						//** Lamine:
						//label="e-mail"
						placeholder="e-mail"
						groupClassname=""
						labelClassname=""
						inputContainerClassName=""
						inputClassname=""
						frontErrorClassname=""
					/>
					{fetchErrorResponse && <ErrorCustom response={fetchErrorResponse} />}

					<div className="ZFormFooter">
						<Button
							className="float-end btn-primary"
							onClick={() => btResetPasswordClick()}
							disabled={isLoading}
						>
							Send me reset password instructions
						</Button>
					</div>
				</Form>
			</div>
		</div>
	)
}
