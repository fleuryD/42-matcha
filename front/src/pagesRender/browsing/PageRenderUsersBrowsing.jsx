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
 *
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"
import { useAppSelector } from "store/store"

import UsersFilters from "components/usersFilters/UsersFilters"
import ErrorCustom from "components/ui/ErrorCustom"
import TodoPageUsersBrowsing from "components/todos/TodoPageUsersBrowsing"
import TodoPageUsersSearch from "components/todos/TodoPageUsersSearch"
import ZLoading from "components/ui/ZLoading"
import UsersCounts from "./UsersCounts"
import UserCard from "./UserCard"
import { Button } from "react-bootstrap"

import "./userCards.scss"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageRenderUsersBrowsing({
	users,
	setUsers,
	filters,
	setFilters,
	resetFilters,
	totalUsersCount,
	interestingUsersCount,
	filteredUsersCount,
	errorResponse,
	isLoading,
	paginationNext,
}) {
	const { modeDev } = useAppSelector((state) => state.auth)
	const handleLike = (userId, val) => {
		const updatedUsers = users.map((user) => (user.id === userId ? { ...user, is_liked_by_me: val } : user))
		setUsers(updatedUsers)
	}
	const handleBlock = (userId, val) => {
		const updatedUsers = users.map((user) => (user.id === userId ? { ...user, is_blocked: val } : user))
		setUsers(updatedUsers)
	}

	return (
		<div className="AppPage">
			<header id="AppPageHeader">
				<h1>Browsing</h1>
				<p>
					Découvrez votre compagnon de quête parfait parmi une myriade de profils soigneusement sélectionnés
					pour correspondre à vos passions, vos intérêts et vos codes.
				</p>

				<UsersCounts
					totalUsersCount={totalUsersCount}
					interestingUsersCount={interestingUsersCount}
					filteredUsersCount={filteredUsersCount}
				/>
			</header>
			<div id="AppPageContent">
				<UsersFilters filters={filters} setFilters={setFilters} resetFilters={resetFilters} />

				<div className="users-list">
					<h2>
						{users?.length} utilisateur-ices affiche-es sur {filteredUsersCount}
					</h2>

					{errorResponse && <ErrorCustom response={errorResponse} />}
					{isLoading && !users && <ZLoading />}
					{users && (
						<>
							<div className="row col-12 userCards-container ">
								{users?.map((user) => (
									<UserCard
										key={"user-table-" + user.id}
										user={user}
										handleLike={handleLike}
										handleBlock={handleBlock}
									/>
								))}
								<div className="card-container row  col-md-12 col-lg-12 col-xl-6 col-xxl-4">
									<div className="card card-load-more">
										<h3>
											{users?.length} utilisateur-ices affiche-es sur {filteredUsersCount}
										</h3>
										{isLoading ? (
											<ZLoading />
										) : (
											<Button onClick={() => paginationNext()}>Load More</Button>
										)}
									</div>
								</div>
							</div>
						</>
					)}
				</div>
				{modeDev && (
					<div className="row col-12">
						<TodoPageUsersBrowsing className="col-12 col-md-6" />
						<TodoPageUsersSearch className="col-12 col-md-6" />
					</div>
				)}
			</div>
		</div>
	)
}
