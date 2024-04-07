// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { useAppSelector } from "store/store"
import { apiGetUsersForAdminDashboard } from "api"
import PageAdminRender from "pagesRender/admin/PageAdminRender"
import { APP_MODE } from "utils/constants"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageAdmin({ openFormSuperPassword }) {
	const { isConnected, superPassword } = useAppSelector((state) => state.auth)

	const [users, setUsers] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [errorResponse, setErrorResponse] = useState(null)

	const [filters, setFilters] = useState({
		orderBy: "id",
		orderReverse: false,

		genderM: true,
		genderF: true,
		genderNB: true,

		loveM: false,
		loveF: false,
		loveNB: false,

		ageMin: null,
		ageMax: null,

		fameMin: null,
		fameMax: null,

		commonTagsCount: 0,
		distanceMax: 0,

		includeBlocked: true,
		includeUninteressedByMe: true,

		minimalVersion: true,
	})

	useEffect(() => {
		setUsers(null)
		setIsLoading(true)
		setErrorResponse(null)

		apiGetUsersForAdminDashboard(filters, isConnected, superPassword).then((response) => {
			if (response.users) {
				setUsers(response.users)
			} else {
				setErrorResponse(response)
			}
			setIsLoading(false)
		})
	}, [filters, isConnected])

	// ************************ RENDER *****************************************

	if (APP_MODE !== "DEV") {
		return (
			<div className="m-3">
				<h2 className="text-danger">Cette page n'est disponnible qu'en mode DEV</h2>
			</div>
		)
	}
	if (!superPassword) {
		return (
			<div className="m-3">
				<h2 className="text-danger">Veuillez définir le SuperPassword pour acceder à cette page.</h2>
			</div>
		)
	}
	return (
		<PageAdminRender
			users={users}
			setUsers={setUsers}
			isLoading={isLoading}
			setIsLoading={setIsLoading}
			errorResponse={errorResponse}
			filters={filters}
			setFilters={setFilters}
		/>
	)
}
