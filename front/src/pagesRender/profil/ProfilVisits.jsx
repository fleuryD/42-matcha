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
 *		Affiche l'Historique des profils visites et les utilisateurs qui ont
 *		visité votre profil.
 *
 *
 *	@usedIn
 *		- Mon Profil
 *
 *
 *
 *	@author		dfleury
 * *
 *
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"
import { date_human_diff } from "utils/helpers_dates"
import { UserLink } from "components/userComponents"

// *■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

//!! GIT_KEEP:  :  user.visits
export default function ProfilVisits({ user, className }) {
	if (!user) return

	return (
		<div className={className}>
			<div className="user-xxxxxxxxxxxxxxxxxxxx col-12">
				<h4>Historique des profils visites</h4>
				{user.visits
					?.filter((vis) => vis.sender_id === user.id)
					.sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
					.map((visit) => (
						<div key={"visit-" + visit.id}>
							<UserLink user={{ id: visit.target_id, username: visit.target_username }} /> &nbsp;
							<small>({date_human_diff(visit.created_at)})</small>
						</div>
					))}
			</div>

			<div className=" user-xxxxxxxxxxxxxxxxxxxx col-12 mt-4">
				<h4>Profil vu par</h4>
				{user.visits
					?.filter((vis) => vis.target_id === user.id)
					.sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
					.map((visit) => (
						<div key={"visit-" + visit.id}>
							<UserLink user={{ id: visit.sender_id, username: visit.sender_username }} /> &nbsp;
							<small>(il y a {date_human_diff(visit.created_at)})</small>
						</div>
					))}
			</div>
		</div>
	)
}
