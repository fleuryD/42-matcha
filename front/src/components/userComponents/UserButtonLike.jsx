// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { useAppSelector } from "store/store"
import { apiLikeUser, apiUnLikeUser } from "api"
import { Button } from "react-bootstrap"
import { FaHeart } from "react-icons/fa"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function UserButtonLike({ user, handleLike, className = "" }) {
	const auth = useAppSelector((state) => state.auth)

	const [isLoading, setIsLoading] = useState(false)

	function btLikeUserClick(user) {
		//alert(userId)
		setIsLoading(true)

		if (!user.is_liked_by_me) {
			// * LIKE USER
			apiLikeUser({ userId: user.id }).then((response) => {
				if (response.like) {
					if (handleLike) handleLike(user.id, true)
				} else if (response.error) {
					console.error("response.error: ", response.error)
				} else {
					console.error("response: ", response)
				}
				setIsLoading(false)
			})
		} else {
			// * UNLIKE USER
			apiUnLikeUser({ userId: user.id }).then((response) => {
				if (response.success) {
					if (handleLike) handleLike(user.id, false)
				} else if (response.error) {
					console.log("response.error: ", response.error)
				} else {
					console.log("response: ", response)
				}
				setIsLoading(false)
			})
		}
	}

	if (auth.id === user.id) return null

	return (
		<Button
			onClick={() => btLikeUserClick(user)}
			disabled={isLoading}
			variant={user.is_liked_by_me ? "outline-danger" : "outline-dark"}
			className={className}
			title={user.is_liked_by_me ? "vous kiffez" : "vous ne kiffez PAS"}
		>
			{!isLoading ? <FaHeart /> : "..."}
		</Button>
	)
}
