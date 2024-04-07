// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { useAppSelector } from "store/store"
import { IcoLike, IcoMatch } from "components/ui/zIcones"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function UserLikesMeOrMatch({ user, className = "" }) {
	// const auth = useAppSelector((state) => state.auth)

	if (!user.is_likes_me) return null

	return (
		<div className={"user-location " + className}>
			{user.is_liked_by_me ? (
				<>
					<IcoMatch /> ca match !
				</>
			) : (
				<>
					<IcoLike /> {user.username} te kiff !
				</>
			)}
		</div>
	)
}
