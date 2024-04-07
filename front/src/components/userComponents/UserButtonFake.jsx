// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { useAppSelector } from "store/store"
import { apiFakeUser, apiUnFakeUser } from "api"
import { Button } from "react-bootstrap"
import { FaUserSlash } from "react-icons/fa"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function UserButtonFake({ otherUser, handleFake, className = "" }) {
	const auth = useAppSelector((state) => state.auth)

	const [isLoading, setIsLoading] = useState(false)

	function btClick(userId) {
		setIsLoading(true)

		if (!otherUser.fakedByMe) {
			// * FAKE USER
			apiFakeUser({ userId: userId }).then((response) => {
				if (response.fake) {
					handleFake(userId, true)
				} else if (response.error) {
					console.error("response.error: ", response.error)
				} else {
					console.error("response: ", response)
				}
				setIsLoading(false)
			})
		} else {
			// * UN-FAKE USER
			apiUnFakeUser({ userId: userId }).then((response) => {
				if (response.success) {
					handleFake(userId, false)
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
			variant={otherUser.fakedByMe ? "danger" : "secondary"}
			className={className}
		>
			<FaUserSlash /> {otherUser.fakedByMe ? "Signalé-e" : "Signaler"} comme fake
		</Button>
	)
}
