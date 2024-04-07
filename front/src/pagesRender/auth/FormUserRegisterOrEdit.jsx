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
 *	@compomentName		FormUserRegisterOrEdit
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
 *		- `pagesRender/auth/PageRenderRegister`
 *		- `pagesRender/auth/PageRenderEditMyProfil`
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
 *	@updatedby	lamine
 *
 *
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"
import Form from "react-bootstrap/Form"
import { Link } from "react-router-dom"
import { useAppSelector } from "store/store"
import { IcoExclamation } from "components/ui/zIcones"
import ZFormGroup from "components/ui/ZFormGroup"

import "./auth.scss"

// *■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function FormUserRegisterOrEdit({ user, setUser, frontErrors, setFrontErrors, isLoading, mode }) {
	const { email } = useAppSelector((state) => state.auth)

	return (
		<>
			<ZFormGroup
				type="text"
				name="username"
				value={user.username}
				setValue={(val) => setUser({ ...user, username: val })}
				error={frontErrors?.username}
				resetError={() => setFrontErrors((errors) => ({ ...errors, username: null }))}
				isLoading={isLoading}
				//** Lamine:
				//label="Username"
				placeholder="Nom d'utilisateur"
				// * tu peux modifier le style de cette input avec ces class:
				groupClassname="col-sm-12 col-md-6 xxl-4 "
				labelClassname=""
				inputContainerClassName=""
				inputClassname=""
				frontErrorClassname=""
			/>
			<ZFormGroup
				type="email"
				name="email"
				value={user.email}
				setValue={(val) => setUser({ ...user, email: val })}
				error={frontErrors?.email}
				resetError={() => setFrontErrors((errors) => ({ ...errors, email: null }))}
				isLoading={isLoading}
				// * lamine:
				//label="e-mail"
				placeholder="Adresse mail"
				// * tu peux modifier le style de cette input avec ces class:
				groupClassname={"col-sm-12 " + (mode === "UPDATE" && email !== user.email ? "col-md-5" : "col-md-6")}
				labelClassname=""
				inputContainerClassName=""
				inputClassname=""
				frontErrorClassname=""
			/>

			{/*
			 * on affiche l'avertissement seulement:
			 *		- si on edite son profil (pas a l'inscription)
			 *		- et si on a modifié l'adresse
			 */}
			{mode === "UPDATE" && email !== user.email && (
				<div className="col-sm-12 col-md-1">
					<button type="button" className="info-button" data-toggle="modal" data-target="#infoModal">
						<IcoExclamation />
						{/* <i className="zmdi zmdi-alert-circle small"></i> */}
					</button>
				</div>
			)}

			<ZFormGroup
				type="text"
				name="firstname"
				value={user.firstname}
				setValue={(val) => setUser({ ...user, firstname: val })}
				error={frontErrors?.firstname}
				resetError={() => setFrontErrors((errors) => ({ ...errors, firstname: null }))}
				isLoading={isLoading}
				// * lamine:
				//label="Prenom"
				placeholder="Prenom"
				// * tu peux modifier le style de cette input avec ces class:
				groupClassname="col-sm-12 col-md-6"
				labelClassname=""
				inputContainerClassName=""
				inputClassname=""
				frontErrorClassname=""
			/>
			<ZFormGroup
				type="text"
				name="lastname"
				value={user.lastname}
				setValue={(val) => setUser({ ...user, lastname: val })}
				error={frontErrors?.lastname}
				resetError={() => setFrontErrors((errors) => ({ ...errors, lastname: null }))}
				isLoading={isLoading}
				// * lamine:
				//label="Nom"
				placeholder="Nom"
				// * tu peux modifier le style de cette input avec ces class:
				groupClassname="col-sm-12 col-md-6"
				labelClassname=""
				inputContainerClassName=""
				inputClassname=""
				frontErrorClassname=""
			/>
			{mode === "REGISTER" && (
				<>
					<ZFormGroup
						type="password"
						name="password"
						value={user.password}
						setValue={(val) => setUser({ ...user, password: val })}
						error={frontErrors?.password}
						resetError={() => setFrontErrors((errors) => ({ ...errors, password: null }))}
						isLoading={isLoading}
						// * lamine:
						//label="Mot de passe"
						placeholder="Mot de passe"
						groupClassname="col-sm-12 col-md-6"
					/>
					<ZFormGroup
						type="password"
						name="password2"
						value={user.password2}
						setValue={(val) => setUser({ ...user, password2: val })}
						error={frontErrors?.password2}
						resetError={() => setFrontErrors((errors) => ({ ...errors, password2: null }))}
						isLoading={isLoading}
						// * lamine:
						//label="Repete le password"
						placeholder="Repete le password"
						groupClassname="col-sm-12 col-md-6"
					/>
				</>
			)}
			<ZFormGroup
				type="date"
				name="birthday"
				value={user.birthday}
				setValue={(val) => setUser({ ...user, birthday: val })}
				error={frontErrors?.birthday}
				resetError={() => setFrontErrors((errors) => ({ ...errors, birthday: null }))}
				isLoading={isLoading}
				// * lamine:
				//label="Date de naissance"
				placeholder="Date de naissance"
				groupClassname="col-12"
			/>
			<ZFormGroup
				type="text"
				name="biography"
				value={user.biography}
				setValue={(val) => setUser({ ...user, biography: val })}
				error={frontErrors?.biography}
				resetError={() => setFrontErrors((errors) => ({ ...errors, biography: null }))}
				isLoading={isLoading}
				// * lamine:
				//label="Biographie"
				placeholder="Biographie (facultative)"
			/>
			<Form.Group controlId="gender" className="ZFormGroup groupSex col-sm-12 col-md-6">
				<Form.Label className="ZLabel">Je suis . . . </Form.Label>
				<div className="ZInputContainer">
					<Form.Check
						id="radio-gender-m"
						value="M"
						type="radio"
						aria-label="radio 1"
						checked={user.gender === "M"}
						onChange={(e) => {
							setUser({ ...user, gender: e.target.value })
							setFrontErrors((errors) => ({ ...errors, gender: null }))
						}}
						label="un homme"
					/>
					<Form.Check
						id="radio-gender-f"
						value="F"
						type="radio"
						aria-label="radio 2"
						checked={user.gender === "F"}
						onChange={(e) => {
							setUser({ ...user, gender: e.target.value })
							setFrontErrors((errors) => ({ ...errors, gender: null }))
						}}
						label="un femme"
					/>
					<Form.Check
						id="radio-gender-nb"
						value="NB"
						type="radio"
						aria-label="radio 3"
						checked={user.gender === "NB"}
						onChange={(e) => {
							setUser({ ...user, gender: e.target.value })
							setFrontErrors((errors) => ({ ...errors, gender: null }))
						}}
						label="non binaire"
					/>
				</div>
				{frontErrors.gender && <div className="ZFrontError">{frontErrors.gender}</div>}
			</Form.Group>
			<Form.Group controlId="orientation" className="ZFormGroup groupSex col-sm-12 col-md-6">
				<Form.Label className="ZLabel">Je kiffe . . .</Form.Label>
				<div className="ZInputContainer">
					<Form.Check
						type="switch"
						id="orientation-switch-m"
						label="Les hommes"
						checked={user.loveM}
						onChange={() => {
							setUser({ ...user, loveM: !user.loveM })
							setFrontErrors((errors) => ({ ...errors, love: null }))
						}}
					/>
					<Form.Check
						type="switch"
						id="orientation-switch-f"
						label="Les femmes"
						checked={user.loveF}
						onChange={() => {
							setUser({ ...user, loveF: !user.loveF })
							setFrontErrors((errors) => ({ ...errors, love: null }))
						}}
					/>
					<Form.Check
						type="switch"
						id="orientation-switch-nb"
						label="Les Non-binaires"
						checked={user.loveNB}
						onChange={() => {
							setUser({ ...user, loveNB: !user.loveNB })
							setFrontErrors((errors) => ({ ...errors, love: null }))
						}}
					/>
					<Form.Check
						type="switch"
						id="orientation-switch-xx"
						label="Personne, je suis un-e geek associal"
						disabled
					/>
				</div>
				{frontErrors.love && <div className="ZFrontError">{frontErrors.love}</div>}
			</Form.Group>
			<Form.Group controlId="cgu" className="ZFormGroup col-8 ZFormGroupCGU">
				<Form.Label className="ZLabel">
					Accepter les <Link to="/cgu">CGU</Link>
				</Form.Label>
				<div className="ZInputContainer">
					<Form.Check
						type="switch"
						id="cgu-switch"
						//label=""
						checked={user.cgu}
						onChange={() => {
							setUser({ ...user, cgu: !user.cgu })
							setFrontErrors((errors) => ({ ...errors, cgu: null }))
						}}
					/>
				</div>
				{frontErrors.cgu && <div className="ZFrontError">{frontErrors.cgu}</div>}

				<div
					className="modal fade"
					id="infoModal"
					tabIndex="-1"
					role="dialog"
					aria-labelledby="infoModalLabel"
					aria-hidden="true"
				>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="infoModalLabel">
									Information
								</h5>
							</div>
							<div className="modal-body">
								Si vous modifiez votre adresse email, vous recevrez un email vous permettant de valider
								cette nouvelle adresse. Si elle est incorrecte, vous ne pourrez plus vous connecter.
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-dismiss="modal">
									Fermer
								</button>
							</div>
						</div>
					</div>
				</div>
			</Form.Group>
		</>
	)
}
