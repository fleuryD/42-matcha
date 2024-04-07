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
 *	@compomentName		PageRenderLogin
 *
 *
 *	@description
 *		Page de connexion
 *		L'utilisateur doit saisir `emailOrUsername` et `password`
 *
 *
 *	@usedIn
 *		- `pages/PageAuthLogin`
 *
 *	@styles
 *		- `styles/global.scss`
 *		- `styles/auth.scss` (vide)
 *		- `styles/form.scss`
 *
 *
 *
 *	@author		dfleury
 *
 *	@updatedby	lamine
 *
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"
import Form from "react-bootstrap/Form"
import { Button } from "react-bootstrap"

import FormAutoFill from "./FormAutoFill"
import ErrorCustom from "components/ui/ErrorCustom"
import ZFormGroup from "components/ui/ZFormGroup"

import "./auth.scss"

// *■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageRenderLogin({
	emailOrUsername,
	setEmailOrUsername,
	password,
	setPassword,
	isLoading,
	errorResponse,
	frontErrors,
	setFrontErrors,
	btLoginClick,
}) {
	// ****  RENDER  ***********************************************************
	return (
		<div className="AppPage" id="PageLogin">
			<div id="AppPageContent" className="d-flex align-items-center justify-content-center">
				<Form className="ZForm row col-sm-12 col-md-8 col-lg-4 col-xl-3 col-xxl-4">
					<div className="ZFormHeader">
						<h1>Connexion</h1>
					</div>

					<ZFormGroup
						type="text"
						name="emailOrUsername"
						value={emailOrUsername}
						setValue={setEmailOrUsername}
						error={frontErrors?.emailOrUsername}
						resetError={() => setFrontErrors((errors) => ({ ...errors, emailOrUsername: null }))}
						isLoading={isLoading}
						//** Lamine:
						//label="Username or Email"
						placeholder="eMail ou nom d'utilisateur"
						groupClassname="row col-12"
						//labelClassname="col-4"
						//inputContainerClassName="col-12"
						//inputClassname=""
						//frontErrorClassname=""
						// "ZFormGroup", "ZLabel", "ZInputContainer", "ZInput", "ZError" sont respectivement ajoutes au attribut
					/>
					<ZFormGroup
						type="password"
						name="password"
						value={password}
						setValue={setPassword}
						error={frontErrors?.password}
						resetError={() => setFrontErrors((errors) => ({ ...errors, password: null }))}
						isLoading={isLoading}
						//** Lamine:
						//label="Mot de passe"
						placeholder="Mot de passe"
						groupClassname="row col-12"
						//labelClassname="col-4"
						//inputContainerClassName="col-12"
						//inputClassname=""
						//frontErrorClassname=""
					/>

					{errorResponse && <ErrorCustom response={errorResponse} />}
					<div className="ZFormFooter">
						<Button className="float-end btn-primary" onClick={() => btLoginClick()} disabled={isLoading}>
							Connexion
						</Button>
					</div>
					<FormAutoFill setUser={null} setEmailOrUsername={setEmailOrUsername} setPassword={setPassword} />
				</Form>
			</div>
		</div>
	)
}
