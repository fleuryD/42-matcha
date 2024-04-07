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
 *		Affiché sur le profil d'un utilisateur (connecté ou autre)
 *		Contient les infos de l'utilisateurs
 *
 *
 *
 *	@usedIn
 *		- `pagesRnder/profil/PageRenderMyProfil`
 *		- `pagesRnder/profil/PageRenderOtherUserProfil`
 *
 *
 *
 *	@author		dfleury
 *
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"
import { Link } from "react-router-dom"

import { useAppSelector } from "store/store"

import { format, parseISO } from "date-fns"
import { IcoEdit } from "components/ui/zIcones"

import { IcoGenderM, IcoGenderF, IcoGenderNB } from "components/ui/zIcones"

import { UserLocation, UserLoves, UserOnlineStatus } from "components/userComponents"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function ProfilInfos({ user, className }) {
	const auth = useAppSelector((state) => state.auth)
	if (!user) return

	const birthdayStr = user.birthday ? format(parseISO(user.birthday), "yyyy-MM-dd") : null

	return (
		<div className={" user-infos " + className}>
			<div className="card-text">
				<div>
					<span style={{ fontSize: "1.8em" }}>
						{user.gender === "M" ? <IcoGenderM /> : user.gender === "F" ? <IcoGenderF /> : <IcoGenderNB />}
					</span>
					{`${user.firstname} ${user.lastname}`}, {user.age} ans ({birthdayStr})
				</div>

				{user.id === auth.id && <div>{user.email}</div>}

				<div>
					{user.id === auth.id && (
						<Link
							to={"/users/" + user.id + "/edit/location"}
							className="btn btn-secondary btn-sm me-2"
							title="Modifier votre localisation"
						>
							<IcoEdit />
						</Link>
					)}
					<UserLocation user={user} className="d-inline" />
				</div>

				<UserLoves user={user} />

				{user.biography && (
					<div>
						<i>"{user.biography}"</i>
					</div>
				)}
				<UserOnlineStatus user={user} />
			</div>
		</div>
	)
}
