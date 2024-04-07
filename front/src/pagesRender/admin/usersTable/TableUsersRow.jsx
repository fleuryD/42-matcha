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

 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"
import { format, parseISO } from "date-fns"
import { useAppSelector } from "store/store"
import LocalisationLink from "components/localisation/LocalisationLink"

import {
	UserButtonQuickLogAs,
	UserFame,
	UserFameDetails,
	UserGender,
	UserIsBlocked,
	UserLikesMeOrMatch,
	UserLink,
	UserLocation,
	UserLoves,
	UserPicture,
} from "components/userComponents"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

function DebugLinkUserEmailToken({ userEmailToken }) {
	return (
		<a href={"http://localhost:3009/auth/check-email/" + userEmailToken} target="_blank" rel="noreferrer">
			DEBUG check-email
		</a>
	)
}

function DebugLinkPasswordResetToken({ passwordResetToken }) {
	return (
		<a
			href={"http://localhost:3009/auth/password/reset/update/" + passwordResetToken}
			target="_blank"
			rel="noreferrer"
		>
			DEBUG reset-pass
		</a>
	)
}

export default function TableUsersRow({ user, filters, handleLike }) {
	const auth = useAppSelector((state) => state.auth)

	const birthdayStr = user.birthday ? format(parseISO(user.birthday), "yyyy-MM-dd") : null

	const lastConnexion = user.last_connection_at
		? format(parseISO(user.last_connection_at), "yyyy-MM-dd '('HH:mm:ss')'")
		: null

	let tagsTitle = ""
	user.tags?.map((tag) => (tagsTitle += tag + ", "))

	return (
		<tr>
			<td>{user.id}</td>
			<td>
				<UserButtonQuickLogAs username={user.username} className="btn-xs" />
			</td>
			{!filters.minimalVersion && (
				<td>
					{user.picture_1 && (
						<UserPicture
							filename={user.picture_1}
							modeSuperPassword={true}
							alt="picture_01"
							className="tabUserPicture"
						/>
					)}
				</td>
			)}
			<td className={auth.id === user.id ? "bg-warning" : ""}>
				<UserLink user={user} />
				{auth.id === user.id && " (Moi)"}
			</td>
			<td>{user.firstname}</td>
			<td>{user.lastname}</td>

			{!filters.minimalVersion && (
				<>
					<td>{user.email}</td>
					<td>
						<div>{user.age} ans</div>
						<small>({birthdayStr})</small>
					</td>
					<td>
						<small title={user.biography || ""}>
							{user.biography &&
								(user.biography.length > 10 ? user.biography.slice(0, 10) + "..." : user.biography)}
						</small>
					</td>
				</>
			)}

			<td>
				<LocalisationLink
					latitude={user.latitude}
					longitude={user.longitude}
					city={user.city}
					distance={user.distance}
				/>
			</td>
			<td className={"td-gender-" + user.gender}>{user.gender}</td>
			<td>
				{user.love_m && <span className="badge-gender-M">M</span>}
				{user.love_f && <span className="badge-gender-F">F</span>}
				{user.love_nb && <span className="badge-gender-NB">NB</span>}
			</td>

			<td>
				<div>{user.is_online ? "🟢" : "🔴"} </div>
				{lastConnexion}
			</td>

			{!filters.minimalVersion && (
				<>
					<td className={user.fame < 0 ? "text-danger" : ""}>{user.fame}</td>

					<td>
						<UserFameDetails user={user} />
					</td>

					<td>{user.email_token && <DebugLinkUserEmailToken userEmailToken={user.email_token} />}</td>

					<td>
						{user.password_reset_token && (
							<DebugLinkPasswordResetToken passwordResetToken={user.password_reset_token} />
						)}
					</td>
					<td title={tagsTitle}>
						x{user.tags?.length}
						{user.tags &&
							user.tags.map((tag) => (
								<span key={"tag-" + user.id + "-" + tag} className="tagItem">
									{tag}
								</span>
							))}
					</td>
				</>
			)}
		</tr>
	)
}
