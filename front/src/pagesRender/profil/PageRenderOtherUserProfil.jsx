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
 *	@author		dfleury
 *
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"

import Chat from "components/chat/Chat"
import TodoChat from "components/todos/TodoChat"
import TodoPageUserOtherProfile from "components/todos/TodoPageUserOtherProfile"

import {
	UserButtonBlock,
	UserButtonFake,
	UserButtonLike,
	UserButtonQuickLogAs,
	UserCantBeLiked,
	UserFame,
	UserLikesMeOrMatch,
} from "components/userComponents"

import ProfilInfos from "./ProfilInfos"
import ProfilTagsOtherUser from "./ProfilTagsOtherUser"
import ProfilPictures from "./ProfilPictures"

import "./profil.scss"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

/*
 *	`PageUserProfil` redirects to this page or `PageMyUserProfilRender`
 *
 */
export default function PageRenderOtherUserProfil({ user, handleLike, handleFake, handleBlock, modeDev }) {
	return (
		<div className="AppPage">
			{/*
			<header id="AppPageHeader">

			</header>
			*/}
			<div id="AppPageContent">
				<div className="profil-container row  col-12 ">
					<div className="row col-12">
						{/*

							// ********************	LEFT SIDE (pictures) :

						*/}

						<div className="profil-left  col-lg-3">
							<ProfilPictures user={user} />
							<div>
								{user.picture_1 ? (
									<UserButtonLike user={user} handleLike={handleLike} className="btn-sm me-2 mb-2" />
								) : (
									<UserCantBeLiked className="me-3 mb-2" />
								)}
								<UserLikesMeOrMatch user={user} className="d-inline-block  me-2  mb-2" />

								<UserButtonFake otherUser={user} handleFake={handleFake} className="btn-sm me-2 mb-2" />
								<UserButtonBlock
									otherUser={user}
									handleBlock={handleBlock}
									className="btn-sm me-2 mb-2"
								/>
								{modeDev && (
									<UserButtonQuickLogAs
										username={user.username}
										refresh
										className="btn-sm me-2 mb-2"
									/>
								)}
							</div>
						</div>

						{/*

							// ********************	CENTER SIDE (infos) :

						*/}

						<div className="profil-right col-lg-5">
							<div className="profil-title">
								<small>Profil de </small>
								<b>{user?.username}</b>
								<UserFame user={user} className={"float-end "} />
							</div>

							<ProfilInfos user={user} className="col-12" />
							<ProfilTagsOtherUser user={user} className="col-12 mt-4" />
						</div>

						{/*

							// ********************	RIGHT SIDE (chat) :

						*/}
						<div className="profil-left  col-lg-4">
							<Chat className="row col-12" otherUser={user} />
						</div>
					</div>
				</div>

				{modeDev && (
					<div className="row ol-12">
						<TodoPageUserOtherProfile className="col-12 col-lg-6" />
						<TodoChat className="col-12 col-lg-6" />
					</div>
				)}
			</div>
		</div>
	)

	// *************************************************************************
}
