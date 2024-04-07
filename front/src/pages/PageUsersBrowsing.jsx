// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { apiGetUsersForExplorer } from "api"
import { useAppSelector } from "store/store"
import PageRenderUsersBrowsing from "pagesRender/browsing/PageRenderUsersBrowsing"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageUsersBrowsing() {
	const auth = useAppSelector((state) => state.auth)

	const [users, setUsers] = useState(null)

	const [totalUsersCount, setTotalUsersCount] = useState(null)
	const [interestingUsersCount, setInterestingUsersCount] = useState(null)
	const [filteredUsersCount, setFilteredUsersCount] = useState(null)

	const [pageNumber, setPageNumber] = useState(0)
	// const [pageinationOffset, setPageinationOffset] = useState(0)

	const [isLoading, setIsLoading] = useState(true)
	const [errorResponse, setErrorResponse] = useState(null)

	const filtersDefault = {
		orderBy: "username",
		orderReverse: false,

		commonTagsCount: 1,
		distanceMax: 500,

		fameMin: null,
		fameMax: 50 + Number(auth.fame),

		ageMin: null,
		ageMax: null,

		genderM: auth.loveM,
		genderF: auth.loveF,
		genderNB: auth.loveNB,

		loveM: auth.gender === "M",
		loveF: auth.gender === "F",
		loveNB: auth.gender === "NB",

		// offset: 0, // ne pas mettre ici
		limit: 12,

		includeBlocked: false,
		includeUninteressedByMe: false, // unused
	}

	const [filters, setFilters] = useState(filtersDefault)

	function resetFilters() {
		setFilters(filtersDefault)
	}

	useEffect(() => {
		console.log("INITIAL FETCH || FILTERS CHANGED")
		setUsers(null)

		setIsLoading(true)
		setErrorResponse(null)

		apiGetUsersForExplorer({ ...filters, offset: pageNumber * filters.limit }).then((response) => {
			if (response.users /* && response.likedUsers && response.likerUsers */) {
				setUsers(response.users)
				if (response.totalUsersCount !== null) setTotalUsersCount(response.totalUsersCount)
				if (response.interestingUsersCount !== null) setInterestingUsersCount(response.interestingUsersCount)
				if (response.filteredUsersCount !== null) setFilteredUsersCount(response.filteredUsersCount)
			} else {
				setErrorResponse(response)
			}
			setIsLoading(false)
		})
	}, [filters])

	useEffect(() => {
		if (!users) return
		console.log("LOAD_MORE FETCH")

		setIsLoading(true)
		setErrorResponse(null)

		apiGetUsersForExplorer({ ...filters, offset: pageNumber * filters.limit }).then((response) => {
			if (response.users) {
				setUsers((users) => [...users, ...response.users])
			} else {
				setErrorResponse(response)
			}
			setIsLoading(false)
		})
	}, [pageNumber])

	function paginationNext() {
		let newPageNumber = pageNumber + 1
		//setFilters({...filters, offset: pageNumber * filters.limit})
		setPageNumber(newPageNumber)
	}

	// ****  RENDER  ***********************************************************

	return (
		<PageRenderUsersBrowsing
			users={users}
			setUsers={setUsers}
			filters={filters}
			setFilters={setFilters}
			resetFilters={resetFilters}
			totalUsersCount={totalUsersCount}
			interestingUsersCount={interestingUsersCount}
			filteredUsersCount={filteredUsersCount}
			errorResponse={errorResponse}
			isLoading={isLoading}
			paginationNext={paginationNext}
		/>
	)
}
