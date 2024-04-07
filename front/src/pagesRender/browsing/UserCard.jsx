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

import { IcoFame } from "components/ui/zIcones"

import {
	UserButtonBlock,
	UserButtonFake,
	UserButtonLike,
	UserButtonQuickLogAs,
	UserCantBeLiked,
	UserFame,
	UserFameDetails,
	UserGender,
	UserIsBlocked,
	UserLikesMeOrMatch,
	UserLink,
	UserLocation,
	UserLoves,
	UserOnlineStatus,
	UserPicture,
	UserTagsNames,
} from "components/userComponents"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

function BadgeFame({ fame = null }) {
	if (fame === null) return

	let className = ""
	if (fame > 50) className = " text-success"
	else if (fame < 0) className = " text-danger"

	return (
		<div className={"fame-badge float-end " + className}>
			<IcoFame />
			{fame}
		</div>
	)
}

// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■

export default function UserCard({ user, handleLike, handleBlock }) {
	const auth = useAppSelector((state) => state.auth)

	/*
	let isInterresedByMe = false
	if (auth.gender === "M" && user.love_m) isInterresedByMe = true
	else if (auth.gender === "F" && user.love_f) isInterresedByMe = true
	else if (auth.gender === "NB" && user.love_nb) isInterresedByMe = true
	*/

	return (
		<div className="card-container row  col-md-12 col-lg-12 col-xl-6 col-xxl-4">
			<div className="card row col-12">
				<div className="card-x row g-0">
					<div className="card-left col-lg-5">
						{user.picture_1 ? (
							<UserPicture
								filename={user.picture_1}
								className="card-img-user img-fluid rounded-start"
								alt="p1"
							/>
						) : (
							<UserCantBeLiked className="mt-4 mb-4" />
						)}

						{auth.isConnected && (
							<>
								{user.picture_1 && (
									<UserButtonLike user={user} handleLike={handleLike} className="bouton-like me-4" />
								)}
								<UserButtonBlock otherUser={user} handleBlock={handleBlock} className=" me-4" />
								<UserLikesMeOrMatch user={user} className="d-inline-block me-4" />
								{auth.modeDev && <UserButtonQuickLogAs username={user.username} refresh />}
								{/*
								<UserIsBlocked user={user} className="d-inline-block border border-warning" />
								*/}
							</>
						)}
					</div>
					<div className="card-right col-lg-7">
						<div className="card-body">
							<h5 className="card-title">
								<UserLink user={user} />
								<BadgeFame fame={user.fame} />
							</h5>

							<div className="card-text">
								<div>
									<UserGender gender={user.gender} />
									{user.firstname} {user.lastname}, {user.age} ans
								</div>

								<UserLocation user={user} />

								<UserLoves user={user} />

								<div>
									{user.common_tags_count} centre{user.common_tags_count > 1 && "s"} d'intérêt en
									commun
									<UserTagsNames user={user} />
								</div>

								{user.biography && (
									<div>
										<i>"{user.biography}"</i>
									</div>
								)}

								<UserOnlineStatus user={user} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
