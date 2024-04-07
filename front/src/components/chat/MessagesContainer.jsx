// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import { useAppSelector } from "store/store"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function MessagesContainer({ messages, otherUsername /*, messagesContainerRef */ }) {
	const auth = useAppSelector((state) => state.auth)

	/*
	const sortedMessages = messages?.sort((m1, m2) =>
		m1.created_at > m2.created_at ? 1 : m1.created_at < m2.created_at ? -1 : 0
	)
*/
	const containerRef = useRef(null)
	useEffect(() => {
		// Scroll to the bottom of the container whenever comments change
		containerRef.current.scrollTop = containerRef.current.scrollHeight
	}, [messages])

	if (!messages) return null

	const sortedMessages = messages
		? [...messages].sort((m1, m2) => (m1.created_at > m2.created_at ? 1 : m1.created_at < m2.created_at ? -1 : 0))
		: []

	//	const sortedMessages = messages
	return (
		<StyledChatContainer /* ref={messagesContainerRef}*/ className="col-12" ref={containerRef}>
			{sortedMessages &&
				sortedMessages.map((msg) => {
					const sendByMe = msg.sender_id === auth.id
					return (
						<StyledMessage key={msg.id} className={sendByMe ? "sendByMe" : "sendByOther"}>
							<small>{sendByMe ? "vous:" : otherUsername}</small>
							<div className="msg-creatorId">{msg.sender_username}</div>
							<div className="msg-createdAt">{msg.created_at.slice(11, 19)}</div> &nbsp;
							<div className="msg-content">{msg.content}</div>
						</StyledMessage>
					)
				})}
		</StyledChatContainer>
	)
}

// 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓	STYLED_COMPONENTS

const StyledMessage = styled.div`
	border-bottom: 2px solid black;
	background-color: #ffffff07;
	padding: 5px;
	margin: 2px;
	height: auto;
	border-radius: 10px;
	margin-bottom: 5px;

	text-align: left;

	* {
		//color: blue;
		font-size: 15px;
	}

	div {
		display: inline-block;
		margin-right: 5px;
	}

	.msg-id {
	}

	.msg-createdAt {
		width: 75px;
		font-size: 0.8em;
		text-align: center;
		float: right;
		margin-top: 5px;
	}

	a {
	}

	.msg-content {
		width: 100%;
		margin-top: 5px;
		padding: 0px 5px;
		word-wrap: break-word;
		white-space: pre-wrap;
	}
`

const StyledChatContainer = styled.div`
	border: 3px double #dddddd;
	height: 40vh !important;
	background-color: #ff000008;
	border-radius: 15px;
	padding: 10px;
	margin: 20px;
	overflow: scroll;
	width: calc(100% - 40px);

	.sendByMe {
		//color: red !important;
	}

	.sendByOther {
		color: green;
		.msg-content {
			text-align: right;
		}
	}
`
