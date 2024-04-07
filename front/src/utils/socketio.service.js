/* eslint-disable no-restricted-globals */
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { io } from "socket.io-client"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

let socket

// ****	CONNEXION/DECONNEXION:

export const initiateSocketConnection = (jwtToken) => {
	//!! GIT_KEEP:  : TODO: change to .ENV :
	console.log(`⏩ initiateSocketConnection...`)
	socket = io("http://localhost:3008", {
		extraHeaders: {
			authorization: jwtToken,
		},
	})
	//console.log(`⏩ Connecting socket...`)
	return socket
}

export const disconnectSocket = () => {
	console.log("⏩ Disconnecting socket...")
	if (socket) socket.disconnect()
}

export const socketSendTest = (message) => {
	console.log("⏩ socketsendtest message:", message)
	socket.emit("socketsendtest", message)
}

export const subscribe4User = (userId, cb) => {
	const subscribeName = "subscribe_4_user_" + userId
	console.log("⏩ subscribe4User: ", subscribeName)
	socket.on(subscribeName, (data) => {
		console.log("📀📀📀📀📀📀📀📀📀📀📀 subscribe4User", data)
		return cb(null, data)
	})
}
