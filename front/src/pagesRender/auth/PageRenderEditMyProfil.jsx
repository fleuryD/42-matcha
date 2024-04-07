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
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"

import ZLoading from "components/ui/ZLoading"
import FormUserRegisterOrEdit from "./FormUserRegisterOrEdit"

import { Button } from "react-bootstrap"
import Form from "react-bootstrap/Form"
import { Link } from "react-router-dom"
import ErrorCustom from "components/ui/ErrorCustom"

import "./auth.scss"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageRenderEditMyProfil({
	user,
	setUser,
	isLoading,
	fetchErrorResponse,
	frontErrors,
	setFrontErrors,
	btEditClick,
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
						<h1>Modifier ton profil</h1>
					</div>
					<div className="row col-12">
						<FormUserRegisterOrEdit
							user={user}
							setUser={setUser}
							frontErrors={frontErrors}
							setFrontErrors={setFrontErrors}
							isLoading={isLoading}
							mode="UPDATE"
						/>
					</div>
					{fetchErrorResponse && <ErrorCustom response={fetchErrorResponse} />}
					<div className="ZFormFooter">
						<Button as={Link} to={"/users/" + user.id} variant="danger" className="" disabled={isLoading}>
							Annuler
						</Button>
						<Button
							variant="warning"
							className="float-end"
							onClick={() => btEditClick()}
							disabled={isLoading}
						>
							Modifier
						</Button>
					</div>
				</Form>
			</div>
		</div>
	)
}
