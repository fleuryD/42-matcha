// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { useAppSelector } from "store/store"
import { format, parseISO } from "date-fns"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

/**
 *
 * @usedIn	UserCard, UserProfilInfos
 * @returns
 */
export default function UserOnlineStatus({ user, className = " " }) {
	const auth = useAppSelector((state) => state.auth)

	if (auth.id === user.id) return null

	const lastConnexion = user.last_connection_at
		? format(parseISO(user.last_connection_at), "yyyy-MM-dd '('HH:mm:ss')'")
		: null

	return (
		<div className={className}>
			<small>
				{user.is_online ? (
					"🟢 En ligne"
				) : (
					<>🔴 Hors ligne. {lastConnexion && ` Derniere connexion: ${lastConnexion}`}</>
				)}
			</small>
		</div>
	)
}
