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
 *		Affiché sur le profil de l'utilisateur connecté
 *		- Les utilisateurs avec qui ça match
 *		- Les utilisateurs qui vous ont liké (hors match)
 *		- Les utilisateurs que vous avez liké (hors match)
 *		xxxxxxxxxxxxxxxxxxxxxxxx
 *
 *
 *	@usedIn
 *		- `xxxxxxxxxx/xxxxxxxxxxxxxxxx`
 *
 *
 *	@author		dfleury
 * *
 *
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"

import { UserLink } from "components/userComponents"
import { UserPicture } from "components/userComponents"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function UserProfilLikes({ user, className }) {
	if (!user || !user.likedUsers || !user.likerUsers) return

	const matchUsers = user.likedUsers.filter(
		(likedUser) => user.likerUsers.filter((userWhoLikeMe) => likedUser.id === userWhoLikeMe.id).length > 0
	)

	const likedUsers = user.likedUsers.filter(
		(likedUser) => user.likerUsers.filter((userWhoLikeMe) => likedUser.id === userWhoLikeMe.id).length === 0
	)
	const likerUsers = user.likerUsers.filter(
		(likerUser) => user.likedUsers.filter((userWhoLikeMe) => likerUser.id === userWhoLikeMe.id).length === 0
	)

	return (
		<div className={className}>
			<div className=" col-12">
				<h4>Ca match avec :</h4>
				{matchUsers.map((matchUser) => (
					<div key={"likeMatchU-" + matchUser.id}>
						{}
						<UserPicture filename={matchUser.picture_1} alt="PiX" width={50} />{" "}
						<UserLink user={matchUser} />
					</div>
				))}
			</div>

			<div className=" col-12 mt-4">
				<h4>Tu kiffe : </h4>
				{likedUsers.map((likedUser) => (
					<div key={"likeU-" + likedUser.id}>
						<UserPicture filename={likedUser.picture_1} alt="PiX" width={50} />{" "}
						<UserLink user={likedUser} />
					</div>
				))}
			</div>
			<div className=" col-12 mt-4">
				<h4>T'es kiffé-e par: </h4>
				{likerUsers.map((likerUser) => (
					<div key={"likerU-" + likerUser.id}>
						<UserPicture filename={likerUser.picture_1} alt="PiX" width={50} />{" "}
						<UserLink user={likerUser} />
					</div>
				))}
			</div>
		</div>
	)
}
