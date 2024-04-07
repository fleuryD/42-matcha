// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { useAppSelector } from "store/store"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

/**
 *
 * @usedIn	UserCard,
 * @returns
 */
export default function ProfilTagsOtherUser({ user, className = "" }) {
	const auth = useAppSelector((state) => state.auth)

	return (
		<div className={className}>
			{user.tags?.map((tag) => (
				<div
					key={"tag-" + user.id + "-" + tag}
					className={
						"tag me-1 badge rounded-pill " +
						(auth.tags?.find((autTag) => autTag.name === tag) ? " bg-success" : " bg-secondary")
					}
				>
					{tag}
				</div>
			))}
		</div>
	)
}
