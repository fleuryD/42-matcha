// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { useEffect } from "react"
import { FaPaperPlane } from "react-icons/fa"
import ErrorCustom from "components/ui/ErrorCustom"
import { apiSendMessage } from "api"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function MessageForm({ targetId, addMessage }) {
	const [content, setContent] = useState("")
	const [isLoading, setIsLoading] = useState("")
	const [errorResponse, setErrorResponse] = useState(null)

	function sendNewMessage(messageContent) {
		messageContent = messageContent.trim()
		if (!messageContent || messageContent === "" || messageContent === undefined) {
			setContent("")
			return
		}
		console.log("sendNewMessage : [" + messageContent + "]")
		console.log("targetId", targetId)
		//	sendMessageToChannel({ creatorId: auth.id, channelId: channelId, content: content })

		setIsLoading(true)
		setErrorResponse(null)

		apiSendMessage({ targetId: targetId, content: messageContent }).then((response) => {
			if (response.message) {
				addMessage(response.message)
				//console.log("response: ", response)
				//dispatch(removeLikedUser({ userId: userId }))
			} else {
				setErrorResponse(response)
			}
			setIsLoading(false)
		})

		setContent("")
	}

	useEffect(() => {
		let elem = document.getElementById("sendMessageInput")
		if (!elem) return
		elem.addEventListener("keyup", function (event) {
			event.preventDefault()
			if (event.key === "Enter") {
				if (!event.shiftKey) {
					sendNewMessage(event.target.value)
				}
			}
		})
	}, [])

	return (
		<div className="row p-2">
			<textarea
				id="sendMessageInput"
				className="inputChannelSend col-12 mb-2"
				placeholder="message"
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>

			{errorResponse && <ErrorCustom response={errorResponse} />}
			<div>
				<button onClick={() => sendNewMessage(content)} disabled={isLoading || content.length === 0}>
					<FaPaperPlane /> Envoyer
				</button>
			</div>
		</div>
	)
}
