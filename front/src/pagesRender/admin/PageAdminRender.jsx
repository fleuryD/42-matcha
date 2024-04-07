/**
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 **■                                                                           ■
 **■                                                        :::      ::::::::  ■
 **■                                                       :+:      :+:    :+: ■
 **■                     | |       | |                  +:+ +:+         +:+    ■
 **■    _ __ ___    __ _ | |_  ___ | |__    __ _      +#+  +:+       +#+       ■
 **■   | '_ ` _ \  / _` || __|/ __|| '_ \  / _` |   +#+#+#+#+#+   +#+          ■
 **■   | | | | | || (_| || |_| (__ | | | || (_| |        #+#    #+#            ■
 **■   |_| |_| |_| \__,_| \__|\___||_| |_| \__,_|       ###   ########.fr      ■
 **■                                                                           ■
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 *
 *	@compomentName		Xxxxxxxxxxxxxxxxxx
 *
 *
 *	@description
 *		xxxxxxxxxxxxxxxxxxxxxxxx
 *		xxxxxxxxxxxxxxxxxxxxxxxx
 *		xxxxxxxxxxxxxxxxxxxxxxxx
 *		xxxxxxxxxxxxxxxxxxxxxxxx
 *		xxxxxxxxxxxxxxxxxxxxxxxx
 *
 *
 *	@usedIn
 *		- `xxxxxxxxxx/xxxxxxxxxxxxxxxx`
 *
 *
 *
 *	@author		dfleury
 *
 *	// @updatedby	lamine
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"
import TableUsers from "./usersTable/TableUsers"
import ButtonFixtures from "./ButtonFixtures"
import UsersFilters from "components/usersFilters/UsersFilters"
import ErrorCustom from "components/ui/ErrorCustom"
import ZLoading from "components/ui/ZLoading"

import "./admin.scss"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageAdminRender({
	users,
	setUsers,
	isLoading,
	setIsLoading,
	errorResponse,
	filters,
	setFilters,
}) {
	return (
		<div className="AppPage" id="PageAdmin">
			<header id="AppPageHeader">
				<h1>Admin: FIxtures + QuickLog</h1>
				<p className="text-danger">
					Le Mode Admin et la connexion avec SuperPassword sont utilisés uniquement en mode DEV ou pour la
					CORRECTION et doivent etre supprimés en PROD !
				</p>
			</header>
			<div id="AppPageContent" className="col-12">
				<ButtonFixtures
					isLoading={isLoading}
					setIsLoading={setIsLoading}
					txt="delete from all tables"
					genre="delete-all-from-all-tables"
				/>
				<ButtonFixtures
					isLoading={isLoading}
					setIsLoading={setIsLoading}
					txt="create users"
					genre="create-users"
				/>
				<ButtonFixtures isLoading={isLoading} setIsLoading={setIsLoading} txt="relations" genre="relations" />
				{isLoading && <ZLoading />}
				{errorResponse && <ErrorCustom response={errorResponse} />}
				{users && !isLoading && !errorResponse && (
					<>
						<h4>{users?.length} users.</h4>
						<div className="z-cadre filter">
							<UsersFilters filters={filters} setFilters={setFilters} modeAdmin={true} />
						</div>
						<TableUsers
							users={users}
							setUsers={setUsers}
							filters={filters}
							setFilters={setFilters}
							mode="ADMIN"
						/>
					</>
				)}
			</div>
		</div>
	)
}
