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
 *	@compomentName		PageRenderRegister
 *
 *
 *	@description
 *		Après une inscription réussie, cette page est affichée.
 *		Un mail a été envoyé à l'utilisateur pour valider son adresse email.
 *
 *		EN MODE DEBUG:
 *		un lien est affiché pour valider l'email sans verification.
 *
 *
 *	@usedIn
 *		- `pages/PageAuthRegister`
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
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"
import { Button } from "react-bootstrap"
import Form from "react-bootstrap/Form"

import ZLoading from "components/ui/ZLoading"
import ErrorCustom from "components/ui/ErrorCustom"

import FormAutoFill from "./FormAutoFill"
import FormUserRegisterOrEdit from "./FormUserRegisterOrEdit"

import "./auth.scss"

// *■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageRenderRegister({
	user,
	setUser,
	isLoading,
	frontErrors,
	setFrontErrors,
	fetchErrorResponse,
	btRegisterClick,
}) {
	// ****  RENDER  ***********************************************************

	return (
		<div id="PageRegister" className="AppPage">
			{/*
			<header id="AppPageHeader">
				<h1>Page Register</h1>
			</header>
			*/}
			{isLoading && <ZLoading />}

			<div id="AppPageContent" className="d-flex align-items-center justify-content-center">
				<Form className="ZForm row col-sm-12 col-md-12 col-lg-10 col-xl-8 col-xxl-6 ">
					<div className="ZFormHeader">
						<h1>Inscription</h1>
					</div>
					<div className="row col-12">
						<FormUserRegisterOrEdit
							user={user}
							setUser={setUser}
							frontErrors={frontErrors}
							setFrontErrors={setFrontErrors}
							isLoading={isLoading}
							mode="REGISTER"
						/>
					</div>

					{fetchErrorResponse && <ErrorCustom response={fetchErrorResponse} />}

					<div className="ZFormFooter">
						<Button
							className="float-end btn-primary"
							onClick={() => btRegisterClick()}
							disabled={isLoading}
						>
							Inscription
						</Button>
					</div>
					<div className="col-12">
						<FormAutoFill setUser={setUser} />
					</div>
				</Form>
			</div>
		</div>
	)
}
