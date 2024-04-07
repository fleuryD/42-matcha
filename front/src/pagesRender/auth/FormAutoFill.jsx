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
 *	@compomentName		FormAutoFill
 *
 *
 *	@description
 *		DEBUG ONLY
 *		Affiche des bouton pour s'inscrire/se connecter rapidement avec des
 *		utilisateurs prédéfinis
 *
 *
 *	@usedIn
 *		- `pageRender/auth/PageRenderRegister`
 *		- `pageRender/auth/PageRenderLogin`
 *
 *
 *
 *	@author		dfleury
 *
 *	// @updatedby	lamine
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"
import { useAppSelector } from "store/store"

import "./auth.scss"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function FormAutoFill({ setUser, setEmailOrUsername = null, setPassword = null }) {
	const { modeDev } = useAppSelector((state) => state.auth)

	if (!modeDev) return
	return (
		<div className="col-12 mt-5 debug bg-secondary">
			<h5>Debug: Auto-fill form:</h5>
			<ButtonLoginAutoFill
				username="dawid"
				email="dawid@42.fr"
				password="pass_D"
				birthday="1981-11-18"
				lastname="David"
				firstname="Fleu"
				gender="M"
				loveM={true}
				loveF={false}
				loveNB={false}
			/>
			<ButtonLoginAutoFill
				username="adrien"
				email="adrien@42.fr"
				password="pass_A"
				birthday="2005-02-28"
				lastname="Adrien"
				firstname="Momomomo"
				gender="M"
				loveM={false}
				loveF={true}
				loveNB={false}
			/>
			<ButtonLoginAutoFill
				username="valentin"
				email="valentin@42.fr"
				password="pass_V"
				birthday="1900-02-28"
				lastname="valentin"
				firstname="Gigigigig"
				gender="M"
				loveM={false}
				loveF={false}
				loveNB={true}
			/>
			<ButtonLoginAutoFill
				username="Momo"
				email="momo@42.fr"
				password="pass_M"
				birthday="2012-02-28"
				lastname="Momo"
				firstname="FFFFFFF"
				gender="NB"
				loveM={false}
				loveF={true}
				loveNB={true}
			/>
			<ButtonLoginAutoFill
				username="greg"
				email="greg@42.fr"
				password="pass_G"
				birthday="2010-01-01"
				lastname="greg"
				firstname="Nihaus"
				gender="M"
				loveM={true}
				loveF={false}
				loveNB={true}
			/>
			<ButtonLoginAutoFill
				username="fanny"
				email="fanny@42.fr"
				password="pass_F"
				birthday="2000-02-28"
				lastname="fanny"
				firstname="Nihaus-Verges"
				gender="F"
				loveM={true}
				loveF={false}
				loveNB={false}
			/>
		</div>
	)

	function ButtonLoginAutoFill({
		username,
		email,
		password,
		birthday,
		lastname,
		firstname,
		gender,
		loveF,
		loveM,
		loveNB,
	}) {
		return (
			<button
				onClick={() => {
					if (setUser)
						setUser({
							username,
							email,
							password,
							password2: password,
							birthday,
							lastname,
							firstname,
							gender,
							loveF,
							loveM,
							loveNB,
							cgu: true,
						})
					else {
						setEmailOrUsername(email)
						setPassword(password)
					}
				}}
			>
				{username}
			</button>
		)
	}
}
