// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { UserPicture } from "components/userComponents"
import { NotificationManager } from "react-notifications"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export function getNotificationMessageFromGenre(genre) {
	switch (genre) {
		case "VISIT":
			return " a visité ton profil"
		case "LIKE":
			return " te kiffe"
		case "UNLIKE":
			return " ne te kiffe plus"
		case "MESSAGE":
			return " t'as envoyé un message"
		case "BLOCK":
			return " --BLOCK--  "
		case "UNBLOCK":
			return " --UNBLOCK--  "
		case "FAKE":
			return " --FAKE--  "
		case "UNFAKE":
			return " --UNFAKE--  "
		default:
			return " ?? " + genre + " ?? "
	}
}

export function showFlashMessageFormNotification(notification) {
	let title = notification.sender_username ? (
		<>
			{notification.sender_picture_1 && (
				<UserPicture filename={notification.sender_picture_1} alt="picture_01" height={75} />
			)}
		</>
	) : (
		"????"
	)
	let message = (
		<>
			<b>{notification.sender_username}</b> {getNotificationMessageFromGenre(notification.genre)}
		</>
	)
	NotificationManager.info(message, title, 10000, () => {
		console.log("")
	})
}
