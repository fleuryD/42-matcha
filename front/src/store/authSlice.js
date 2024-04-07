// *** slice : “a collection of Redux reducer logic and actions for a single feature in your app.”

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { createSlice } from "@reduxjs/toolkit"
import { APP_MODE } from "utils/constants"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// Initial state
const initialState = {
	isConnected: localStorage.getItem("access_token") !== null,

	id: localStorage.getItem("id") ? Number(localStorage.getItem("id")) : null,
	email: localStorage.getItem("email") || null,
	username: localStorage.getItem("username") || null,

	// birthday: localStorage.getItem("birthday") || null,

	accessToken: localStorage.getItem("access_token") || null,
	gender: localStorage.getItem("gender") || null,

	loveM: localStorage.getItem("love_m") === "1",
	loveF: localStorage.getItem("love_f") === "1",
	loveNB: localStorage.getItem("love_nb") === "1",

	picture_1: localStorage.getItem("picture_1") || null,

	latitude: localStorage.getItem("latitude") || null,
	longitude: localStorage.getItem("longitude") || null,
	city: localStorage.getItem("city") || null,

	fame: localStorage.getItem("fame") || null,

	tags: localStorage.getItem("tags") ? JSON.parse(localStorage.getItem("tags")) : null,

	notifications: localStorage.getItem("notifications") ? JSON.parse(localStorage.getItem("notifications")) : null,
	notificationsInCurrentChat: [],

	modeDev: APP_MODE === "DEV" && localStorage.getItem("mode_dev") === "1",
	superPassword: (APP_MODE === "DEV" && localStorage.getItem("super_password")) || null,
}

// Actual Slice
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// ** AUTH
		authLoginSuccess(state, action) {
			// * ALSO USED IN PageUserEdit
			console.log("🏵🏵🏵🏵🏵🏵 authLoginSuccess action.payload", action.payload)

			state.isConnected = true

			if (!action.payload.id) console.error("❌ authLoginSuccess: Error: No 'id'")
			state.id = action.payload.id
			localStorage.setItem("id", action.payload.id)

			if (!action.payload.access_token) console.error("❌ authLoginSuccess: Error: No 'access_token'")
			state.accessToken = action.payload.access_token
			localStorage.setItem("access_token", action.payload.access_token)

			if (!action.payload.username) console.error("❌ authLoginSuccess: Error: No 'username'")
			state.username = action.payload.username
			localStorage.setItem("username", action.payload.username)

			if (!action.payload.email) console.error("❌ authLoginSuccess: Error: No 'email'")
			state.email = action.payload.email
			localStorage.setItem("email", action.payload.email)

			if (!action.payload.gender) console.error("❌ authLoginSuccess: Error: No 'gender'")
			state.gender = action.payload.gender
			localStorage.setItem("gender", action.payload.gender)

			if (!action.payload.love_m && !action.payload.love_f && !action.payload.love_nb)
				console.error("❌ authLoginSuccess: Error: 'love_nobody'")
			state.loveM = action.payload.love_m
			state.loveF = action.payload.love_f
			state.loveNB = action.payload.love_nb
			localStorage.setItem("love_m", action.payload.love_m ? "1" : "0")
			localStorage.setItem("love_f", action.payload.love_f ? "1" : "0")
			localStorage.setItem("love_nb", action.payload.love_nb ? "1" : "0")

			state.picture_1 = action.payload.picture_1
			localStorage.setItem("picture_1", action.payload.picture_1)

			if (!action.payload.latitude) console.error("❌ authLoginSuccess: Error: No 'latitude'")
			state.latitude = action.payload.latitude
			localStorage.setItem("latitude", action.payload.latitude)

			if (!action.payload.longitude) console.error("❌ authLoginSuccess: Error: No 'longitude'")
			state.longitude = action.payload.longitude
			localStorage.setItem("longitude", action.payload.longitude)

			if (!action.payload.city) console.error("❌ authLoginSuccess: Error: No 'city'")
			state.city = action.payload.city
			localStorage.setItem("city", action.payload.city)

			if (!action.payload.fame) console.error("❌ authLoginSuccess: Error: No 'fame'")
			state.fame = action.payload.fame
			localStorage.setItem("fame", action.payload.fame)

			if (!action.payload.tags) console.error("❌ authLoginSuccess: Error: No 'tags'")
			state.tags = action.payload.tags
			localStorage.setItem("tags", JSON.stringify(action.payload.tags))

			if (!action.payload.notifications) console.error("❌ authLoginSuccess: Error: No 'notifications'")
			state.notifications = action.payload.notifications
			localStorage.setItem("notifications", JSON.stringify(action.payload.notifications))
		},

		authSetNotifications(state, action) {
			state.notifications = action.payload
			localStorage.setItem("notifications", JSON.stringify(action.payload))
		},

		/*
		 *
		 *		Quand on recoit une notification par socket:
		 *		Si c'est un message de Chat et que le connectedUser est sur la page de ce chat, on appelle `authAddNotificationInCurrentChat`
		 *		Sinon (c'est une notification standard), on appelle `authAddNotification`
		 *
		 *
		 */
		authAddNotification(state, action) {
			const newNotifications = [...state.notifications, action.payload]
			state.notifications = newNotifications
			localStorage.setItem("notifications", JSON.stringify(newNotifications))
		},

		authAddNotificationInCurrentChat(state, action) {
			const newNotifications = [...state.notificationsInCurrentChat, action.payload]
			state.notificationsInCurrentChat = newNotifications
			//localStorage.setItem("notificationsInCurrentChat", JSON.stringify(notificationsInCurrentChat))
		},

		authToggleModeDev(state, action) {
			if (state.modeDev) {
				state.modeDev = false
				localStorage.setItem("mode_dev", "0")
			} else {
				state.modeDev = true
				localStorage.setItem("mode_dev", "1")
			}
		},

		// ** TAGS
		setTags(state, action) {
			state.tags = action.payload.tags
			localStorage.setItem("tags", JSON.stringify(action.payload.tags))
		},
		setAuthSuperPassword(state, action) {
			state.superPassword = action.payload.superPassword
			localStorage.setItem("super_password", action.payload.superPassword)
		},

		authLogoutSuccessX(state) {
			state.isConnected = false
			state.id = null
			state.access_token = null
			state.name = null
			state.email = null
			state.latitude = null
			state.longitude = null
			state.city = null
			state.tags = null
			state.notifications = null
			state.mode_dev = null
			localStorage.removeItem("id")
			localStorage.removeItem("access_token")
			localStorage.removeItem("username")
			localStorage.removeItem("email")
			localStorage.removeItem("gender")
			localStorage.removeItem("love_m")
			localStorage.removeItem("love_f")
			localStorage.removeItem("love_nb")
			localStorage.removeItem("picture_1")
			localStorage.removeItem("latitude")
			localStorage.removeItem("longitude")
			localStorage.removeItem("city")
			localStorage.removeItem("tags")
			localStorage.removeItem("notifications")
			localStorage.removeItem("mode_dev")
		},
	},
})

export const {
	authLoginSuccess,
	authSetNotifications,
	authAddNotification,

	authToggleModeDev,
	setAuthSuperPassword,
	authAddNotificationInCurrentChat,
	setTags,
} = authSlice.actions

export default authSlice.reducer

const { authLogoutSuccessX } = authSlice.actions

export const authLogoutSuccess = () => (dispatch) => {
	dispatch(authLogoutSuccessX())
}
