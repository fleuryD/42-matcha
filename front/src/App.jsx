// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "store/store"

import PageCgu from "pagesRender/PageCgu"
import Page404 from "pagesRender/Page404"
import PageAbout from "pagesRender/PageAbout"
import PageHome from "pagesRender/PageHome"
import PageRenderEditMyEmailSuccess from "pagesRender/auth/PageRenderEditMyEmailSuccess"
import {
	PageAuthLogin,
	PageAuthRegister,
	PageAuthCheckEmail,
	PageAuthPasswordUpdate,
	PageAuthPasswordResetAsk,
	PageUserProfil,
	PageUsersBrowsing,
	PageUserEditLocation,
	PageUserEdit,
	PageAdmin,
} from "pages"

import FormSuperPassword from "components/FormSuperPassword"
import DevAuthInfos from "components/dev/DevAuthInfos"
import DevScreenWIdth from "components/dev/DevScreenWIdth"
import NavBar from "components/navbar/NavBar"
import Footer from "components/footer/Footer"

import { authAddNotification, authAddNotificationInCurrentChat } from "store/authSlice"

import { initiateSocketConnection, disconnectSocket, subscribe4User } from "utils/socketio.service"

import { NotificationContainer } from "react-notifications"

import { showFlashMessageFormNotification } from "utils/notifications.utils"
import { checkEnv } from "utils/constants"

import "react-notifications/lib/notifications.css"

import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/global.scss"
import "./styles/form.scss"
import "./components/users/users.scss"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

function App() {
	const dispatch = useAppDispatch()
	const [showFormSuperPassword, setShowFormSuperPassword] = useState(false)
	const auth = useAppSelector((state) => state.auth)

	useEffect(() => {
		checkEnv()
		if (!auth.isConnected) return
		try {
			if (initiateSocketConnection(auth.accessToken)) {
				subscribe4User(auth.id, (err, received) => {
					if (received.genre === "MESSAGE" && window.location.href.endsWith("users/" + received.sender_id)) {
						console.log("🟢🟢 subscribe4User::NewMessageInCurrentChat::received:", received)
						dispatch(authAddNotificationInCurrentChat(received))
					} else {
						console.log("🟢🟢 subscribe4User::Notification::received:", received)
						showFlashMessageFormNotification(received)
						dispatch(authAddNotification(received))
					}
				})
			}
			return () => {
				console.log("🟠 APP>useEffect>disconnectSocket")
				disconnectSocket()
			}
		} catch (error) {
			console.log("initiateSocketConnection.catch.error", error)
		}
	}, [auth.id, auth.isConnected, auth.accessToken, auth.incomingNnotifications, dispatch])

	return (
		<div id="App" className={auth.modeDev ? "modeDev" : ""}>
			<Router>
				<NavBar setShowFormSuperPassword={setShowFormSuperPassword} />
				{showFormSuperPassword && (
					<FormSuperPassword
						closeForm={() => {
							setShowFormSuperPassword(false)
							//window.location.reload()
						}}
					/>
				)}

				{auth.isConnected ? (
					<>
						<Routes>
							<Route path="/" element={<PageHome />} />
							<Route path="/users/explorer" element={<PageUsersBrowsing />} />
							<Route path="/users/:id/edit/location" element={<PageUserEditLocation />} />
							<Route path="/users/:id/edit" element={<PageUserEdit />} />
							<Route path="/users/:id" element={<PageUserProfil />} />
							<Route
								path="/admin"
								element={<PageAdmin openFormSuperPassword={() => setShowFormSuperPassword(true)} />}
							/>
							<Route path="/about" element={<PageAbout />} />
							<Route path="/cgu" element={<PageCgu />} />
							<Route path="*" element={<Page404 />} />
						</Routes>

						<NotificationContainer />
					</>
				) : (
					<Routes>
						<Route path="/auth/register" element={<PageAuthRegister />} />
						<Route path="/auth/check-email/:emailToken" element={<PageAuthCheckEmail />} />
						<Route
							path="/auth/password/reset/update/:passwordToken"
							element={<PageAuthPasswordUpdate />}
							isSuccess
						/>
						<Route path="/auth/password/reset/ask" element={<PageAuthPasswordResetAsk />} />
						<Route path="/auth/edit-my-email-success/:email" element={<PageRenderEditMyEmailSuccess />} />

						<Route
							path="/admin"
							element={<PageAdmin openFormSuperPassword={() => setShowFormSuperPassword(true)} />}
						/>
						<Route path="/about" element={<PageAbout />} />
						<Route path="/cgu" element={<PageCgu />} />
						<Route path="/*" element={<PageAuthLogin />} />
					</Routes>
				)}
				{auth.modeDev && (
					<>
						<DevAuthInfos />
						<DevScreenWIdth />
					</>
				)}
			</Router>

			<Footer />
		</div>
	)
}

export default App
