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
 *	@compomentName		ProfilNotifications
 *
 *
 *	@description
 *		Affiché sur le profil de l'utilisateur connecté
 *
 *
 *	@usedIn
 *		<picture> Wolverine a visité ton profil (il y a 58 minutes)
 *		<picture> Wolverine te kiffe (il y a 58 minutes)
 *		<picture> AlfredNobel a visité ton profil(il y a 5 minutes)
 *		<picture> AlfredNobel te kiffe(il y a 4 minutes)
 *		<picture> AlfredNobel t'as envoyé un message(il y a 3 minutes)
 *
 *	@usedIn
 *		- `xxxxxxxxxx/xxxxxxxxxxxxxxxx`
 *
 *
 *
 *	@author		dfleury
 *
 *
 *
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React, { useState } from "react"
import { date_human_diff } from "utils/helpers_dates"
import { getNotificationMessageFromGenre } from "utils/notifications.utils"
import { Button } from "react-bootstrap"
import { apiMarkAllNotificationAsRead } from "api"
import { useAppSelector } from "store/store"

import UserLink2 from "components/users/UserLink2"
import { IcoNotification } from "components/ui/zIcones"
import { UserPicture } from "components/userComponents"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function ProfilNotifications({ /* notifications, */ deleteAllNotifications, className = "" }) {
	const [isLoading, setIsLoading] = useState(false)

	const { notifications } = useAppSelector((state) => state.auth)

	if (!notifications) return null

	function buttonClickMarkAllAsRead() {
		setIsLoading(true)
		apiMarkAllNotificationAsRead().then((response) => {
			if (response.success) {
				deleteAllNotifications()
			} else if (response.error) {
				console.error("response.error: ", response.error)
			} else {
				console.error("response: ", response)
			}
			setIsLoading(false)
		})
	}

	return (
		<div className={className}>
			<h3>
				<IcoNotification />
				{notifications?.length} notification{notifications?.length > 1 && "s"}
				{notifications?.length > 0 && (
					<>
						{!isLoading ? (
							<Button className="text-warning btn-sm ms-3" onClick={() => buttonClickMarkAllAsRead()}>
								Tout marquer comme lus
							</Button>
						) : (
							<div>Chargement...</div>
						)}
					</>
				)}
			</h3>
			{notifications.map((notification) => (
				<div key={"notif-" + notification.id} className="mb-1">
					{notification.sender_picture_1 && (
						<UserPicture filename={notification.sender_picture_1} alt="picture_1" width={50} />
					)}
					<UserLink2 id={notification.sender_id} username={notification.sender_username} />
					{getNotificationMessageFromGenre(notification.genre)}

					<small>({date_human_diff(notification.created_at)})</small>
				</div>
			))}
		</div>
	)
}
