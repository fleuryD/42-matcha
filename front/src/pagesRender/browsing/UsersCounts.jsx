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
 *
 *	@author		dfleury
 *
 *	// @updatedby	lamine
 *
 *
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"
import { useAppSelector } from "store/store"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

/**
 * @exemple
 * 		"Parmis les 501 utilisateur.rice.s inscrits, 200 correspondent a votre profil (des hommes ou Non-binaires qui aiment les Femmes ) et 79 correspondent a votre recherche."
 *
 *
 *
 */

export default function UsersCounts({ totalUsersCount, interestingUsersCount, filteredUsersCount }) {
	const auth = useAppSelector((state) => state.auth)

	if (
		Number(totalUsersCount) === null ||
		Number(interestingUsersCount) === null ||
		Number(filteredUsersCount) === null
	)
		return <>...</>

	return (
		<div className="">
			Parmis les <b>{Number(totalUsersCount)}</b> utilisateur.rice.s inscrits,{" "}
			<b>{Number(interestingUsersCount)}</b> correspondent a votre profil{" "}
			<small>
				(
				<b>
					{auth.loveM && "des hommes "}
					{auth.loveF && auth.loveM && "ou "}
					{auth.loveF && "des femmes "}
					{auth.loveNB && (auth.loveM || auth.loveF) && "ou "}
					{auth.loveNB && "Non-binaires"}
				</b>{" "}
				qui aiment les{" "}
				<b>
					{auth.gender === "M" && "Hommes"} {auth.gender === "F" && "Femmes"}{" "}
					{auth.gender === "NB" && "Non-binaires"}
				</b>
				)
			</small>{" "}
			et <b>{Number(filteredUsersCount)}</b> correspondent a votre recherche.
		</div>
	)
}
