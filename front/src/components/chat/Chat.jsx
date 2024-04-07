// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState, useEffect } from "react"

import { useAppSelector } from "store/store"
import MessagesContainer from "./MessagesContainer"
import MessageForm from "./MessageForm"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

/*
 *
 * 	Chat
 *
 *	Une meilleur facon de faire :
 *		Dans le store rajouter :	auth.messagesInCurrentChat
 *
 *
 */

export default function Chat({ otherUser, className }) {
	const auth = useAppSelector((state) => state.auth)

	const [messages, setMessages] = useState(otherUser?.messages || null)

	useEffect(() => {
		for (const notif of auth.notificationsInCurrentChat) {
			if (notif.genre === "MESSAGE" && notif.sender_id === otherUser.id && notif.message) {
				setMessages([...messages, notif.message])
				//	scrollToBottom()
			}
		}
	}, [auth.notificationsInCurrentChat, otherUser.id]) // * NE PAS METTRE `messages` SINONm

	if (!otherUser) return null
	if (!auth.id) return null
	if (auth.id === otherUser.id) return null

	function addMessage(newMessage) {
		if (messages) setMessages([...messages, newMessage])
	}

	//const messages = otherUser?.messages || null

	return (
		<div className={"chat z-cadre " + className}>
			<div className="chat-header">
				<h4>
					Chat avec <b>{otherUser.username}</b>
					{/*  (Me: {auth.username}) */}
				</h4>
			</div>

			<MessagesContainer
				messages={messages}
				otherUsername={otherUser.username} /* messagesContainerRef={messagesContainerRef} */
			/>
			{/*
			{otherUser.is_blocked && <div>Tu as blocke {otherUser.username}</div>}
			{!otherUser.is_likes_me && <div>NO MATCH: {otherUser.username} ne te kiff pas</div>}
			{!otherUser.is_liked_by_me && <div>NO MATCH: tu ne kiffes pas {otherUser.username}</div>}
			*/}
			<MessageForm targetId={otherUser.id} addMessage={addMessage} />
		</div>
	)
}
