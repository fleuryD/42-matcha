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
 *	@compomentName		PageRenderMyProfil
 *
 *
 *	@description
 *		Sur cette page, l'utilisateur peut voir son profil, ses photos,
 *		ses informations, ses centres d'intérêt, les personnes qui l'ont liké,
 *		les personnes qu'il a liké, les personnes qui l'ont visité,
 *		et les notifications reçues.
 *
 *		On affiche aussi les boutons pour modifier le profil, la position et les tags.
 *
 *	@usedIn
 *		- `xxxxxxxxxx/xxxxxxxxxxxxxxxx`
 *
 *	@props
 *		- showTagsForm,  setShowTagsForm: boolean, function pour afficher le formulaire de mofication de tags

 		- user {
			id, email, firstname, lastname, age, birthday, ?biography,
			fame, count_blocked, count_faked, count_liked, count_visited,
			latitude, longitude, ?city,
			?picture_1, ?picture_2, ?picture_3, ?picture_4, ?picture_5,
			gender: "M" | "F" | "NB",
			love_f, love_m, love_nb: boolean : si l'utilisateur est intéressé par les femmes, les hommes, les non-binaires,
			is_online: false,
			last_connection_at: "2024-03-22T15:05:32.093Z",
			likedUsers: Array [ { id: 291, username: "AimanBerthier", picture_1: "um_001.jpg"}, ... ],
			likerUsers: Array [ { id: 163, username: "SamsagaceGangie", picture_1: "lotr-samsagace-1.jpg" }, ... ],
			notifications: Array [ {
										id, created_at, ​​​genre: "LIKE"​​​
										is_read: 0​​​​
										sender_id, sender_picture_1, sender_username
										target_id
									} ]
			tags: Array(6) [ {	category: "Bectance", id: 104, name: "Kebab", tag_id: 104, user_id: 141	},  … ],
			username: "PabloPicasso",
			visits: Array [ {created_at: "2024-03-22T09:56:49.743Z", id: 172, sender_id: 323, sender_username: "RachelGreen", target_id: 141, target_username: "PabloPicasso"}, ... ],
		}
 *
 *	@author		dfleury
 *
 *	// @updatedby	lamine
 *
 *
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"

import { UserFame, UserFameDetails } from "components/userComponents"
import UserTagsForm from "components/tags/UserTagsForm"
import { IcoEdit } from "components/ui/zIcones"

import ProfilInfos from "./ProfilInfos"
import ProfilPictures from "./ProfilPictures"
import ProfilTagsFromAuth from "./ProfilTagsFromAuth"
import ProfilNotifications from "./ProfilNotifications"
import ProfilLikes from "./ProfilLikes"
import ProfilVisits from "./ProfilVisits"

import TodoPageUserMyProfile from "components/todos/TodoPageUserMyProfile"
import TodoNotifications from "components/todos/TodoNotifications"

import "./profil.scss"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

/*
 *	`PageUserProfil` redirects to this page or `PageUserProfilOther`
 *
 */
export default function PageRenderMyProfil({
	user,
	modeDev,
	birthdayStr,
	showTagsForm,
	setShowTagsForm,
	deleteAllNotifications,
}) {
	return (
		<div className="AppPage">
			{showTagsForm && (
				<UserTagsForm
					user={user}
					className="col-11 "
					closeForm={() => setShowTagsForm(false)}
					//closeForm={() => window.location.reload()}
				/>
			)}
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

						<div className="profil-left  col-lg-5">
							<ProfilPictures user={user} />
						</div>
						{/*

							// ********************	RIGHT SIDE (infos) :

						*/}
						<div className="profil-right col-lg-7">
							<div className="profil-title  mb-3 pb-3">
								<Link
									to={"/users/" + user.id + "/edit"}
									className="btn btn-secondary btn-sm"
									title="Modifier votre profil"
								>
									<IcoEdit />
								</Link>
								<small> Mon Profil:</small> <b>{user.username}</b>
								<div className="float-end text-end">
									<UserFame user={user} />
									<UserFameDetails user={user} style={{ fontSize: "0.5em" }} />
								</div>
							</div>

							<div className="profil-body mb-3 pb-3 border-bottom  border-top border-primary">
								<ProfilInfos user={user} className="col-12 mb-3" />
								<div>
									<Button
										className="btn-secondary btn-sm me-2"
										title="Modifier vos centres d'intérêt"
										onClick={() => setShowTagsForm(!showTagsForm)}
									>
										<IcoEdit />
									</Button>
									Tes centre{user.tags.length > 1 && "s"} d'intérêt:
									<ProfilTagsFromAuth />
								</div>
								{user.biography && (
									<div className="mt-4">
										<i>"{user.biography}"</i>
									</div>
								)}
							</div>
							<div className="row col-12  mb-3 pb-3 border-bottom  border-primary">
								<ProfilLikes user={user} className="col-12 col-md-6 col-lg-6 " />
								<ProfilVisits user={user} className="col-12 col-md-6 col-lg-6" />
							</div>

							<ProfilNotifications
								notifications={user.notifications}
								deleteAllNotifications={deleteAllNotifications}
								className="row col-12 pt-2"
							/>
						</div>
					</div>
				</div>

				{modeDev && (
					<div className="row col-12">
						<TodoPageUserMyProfile className="col-12 col-lg-6" />
						<TodoNotifications className="col-12 col-lg-6" />
					</div>
				)}
			</div>
		</div>
	)
	// *************************************************************************
}
