// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { useAppSelector } from "store/store"
import { apiBlockUser, apiUnBlockUser } from "api"
import { Button } from "react-bootstrap"
import { IcoBlock } from "components/ui/zIcones"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function UserButtonBlock({ otherUser, handleBlock, className = "" }) {
	const auth = useAppSelector((state) => state.auth)
	const [isLoading, setIsLoading] = useState(false)

	function btClick(userId) {
		//alert(userId)
		setIsLoading(true)

		if (!otherUser.is_blocked) {
			// * BLOCK USER
			apiBlockUser({ userId: userId }).then((response) => {
				if (response.block) {
					handleBlock(userId, true)
					//setAlreadyBlocked(true)
				} else if (response.error) {
					console.error("response.error: ", response.error)
				} else {
					console.error("response: ", response)
				}
				setIsLoading(false)
			})
		} else {
			// * UNBLOCK USER
			apiUnBlockUser({ userId: userId }).then((response) => {
				if (response.success) {
					handleBlock(userId, false)
					//setAlreadyBlocked(false)
				} else if (response.error) {
					console.log("response.error: ", response.error)
				} else {
					console.log("response: ", response)
				}
				setIsLoading(false)
			})
		}
	}

	if (auth.id === otherUser.id) return null

	return (
		<Button
			onClick={() => btClick(otherUser.id)}
			disabled={isLoading}
			variant={otherUser.is_blocked ? "danger" : "secondary"}
			className={className}
		>
			{!isLoading ? <IcoBlock /> : "..."} {otherUser.is_blocked ? "Débloquer" : "Bloquer"}
		</Button>
	)
}
