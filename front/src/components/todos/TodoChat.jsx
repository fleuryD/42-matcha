// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { Ul, Li } from "./todo"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function TodoChat({ className = "" }) {
	const [isVisible, setIsVisible] = useState(true)

	return (
		<div className={"todoSubject  " + className}>
			<h3 onClick={() => setIsVisible(!isVisible)}>Subject.6 Chat</h3>

			{isVisible && (
				<Ul>
					<Li>
						When two users are connected (Meaning they have “liked” each other.), they must be able to
						“chat” in real-time (with a maximum delay of 10 seconds.). The implementation of the chat is up
						to you.
					</Li>
					<Li>The user must be able to see from any page if a new message is received.</Li>
				</Ul>
			)}
		</div>
	)
}
