// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { Ul, Li } from "./todo"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function TodoNotifications({ className = "" }) {
	const [isVisible, setIsVisible] = useState(true)

	return (
		<div className={"todoSubject " + className}>
			<h3 onClick={() => setIsVisible(!isVisible)}>Subject.7 Notifications</h3>

			{isVisible && (
				<Ul>
					<Li>
						A user must be notified in real-time (with a maximum delay of 10 seconds.) of the following
						events:
						<Ul>
							<Li>When the user receives a “like”.</Li>
							<Li>When the user’s profile has been viewed.</Li>
							<Li>When the user receives a message.</Li>
							<Li>When “liked” user also “likes” the user back.</Li>
							<Li>When a connected user “unlikes” the user.</Li>
						</Ul>
					</Li>

					<Li>A user must be able to see, from any page, that a notification hasn’t been read.</Li>
				</Ul>
			)}
		</div>
	)
}
