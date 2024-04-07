// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import { NotificationManager } from "react-notifications"
import axios from "axios"

import { apiUpdatetUserLocation } from "api"
import { apiGetCityNameFromCoord, apiLocationSearch } from "api/api.location"
import { useFetchUserLocation, useFetchGetIpCoords } from "api/api.location"

import { useAppSelector, useAppDispatch } from "store/store"
import { authLoginSuccess } from "store/authSlice"

import PageRenderEditLocation from "pagesRender/editLocation/PageRenderEditLocation"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageUserEditLocation() {
	const dispatch = useAppDispatch()
	const userId = Number(useParams().id) || 0
	const auth = useAppSelector((state) => state.auth)

	// * the location mode selected by the user
	// * "PROFIL" | "BROWSER" | "IP" | "SEARCH"
	const [selectedMode, setSelectedMode] = useState("PROFIL")

	// * fetch user's currentCoords
	// * user: {id, latitude, longitude, city} from user's profil :
	const { user, isLoading: userLoading, errorResponse } = useFetchUserLocation(userId)

	// * {latitude, longitude} from `navigator.geolocation.getCurrentPosition`
	// * then {city} from api
	const [browserCoords, setBrowserCoords] = useState(null)

	// * {ip} from `api.ipgeolocation.io`
	// * then {latitude, longitude, city} from api
	const { ipCoords } = useFetchGetIpCoords()

	// *  {latitude, longitude, city} from search api
	const [searchedCoords, setSearchedCoords] = useState(null)

	// * {latitude, longitude, city} updated:
	//const [newCoords, setNewCoords] = useState(null)

	//*******************

	const [searchText, setSearchText] = useState("")
	const [searchResult, setSearchResult] = useState(null)

	const [fetchErrorResponseGet, setFetchErrorResponseGet] = useState(null)

	const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
	const [frontErrors, setFrontErrors] = useState({})
	const [fetchErrorResponseUpdate, setFetchErrorResponseUpdate] = useState(null)

	const navigate = useNavigate()

	// ***************************************************	 get location from Navigator API

	useEffect(() => {
		if (navigator.geolocation === "undefined") {
			console.error("Geolocation unsupported")
		} else {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setBrowserCoords({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						city: null,
					})

					apiGetCityNameFromCoord({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					}).then((data) => {
						if (data.features && data.features.length > 0) {
							const city = data.features[0].properties.city
							setBrowserCoords({
								latitude: position.coords.latitude,
								longitude: position.coords.longitude,
								city,
							})
						} else {
							setBrowserCoords({ ...browserCoords, city: "404_CITY_NOT_FOUND" })
						}
					})
				},
				(error) => {
					console.warn("Error getting user location:", error)
				}
			)
		}
	}, [])

	// ***************************************************	SearchText changed

	useEffect(() => {
		setSearchResult(null)
		if (searchText.length < 3) return
		apiLocationSearch({ searchText }).then((response) => {
			console.log("😈😈😈😈😈response", response)
			if (response.features) {
				setSearchResult(response.features)
			}
		})
	}, [searchText])

	// ***************************************************	bt Edit Click

	const btEditClick = async () => {
		setFetchErrorResponseUpdate(null)
		setFrontErrors({})

		let newCoords = { id: auth.id }
		if (selectedMode === "PROFIL") {
			newCoords = { ...newCoords, ...user }
		} else if (selectedMode === "BROWSER") {
			newCoords = { ...newCoords, ...browserCoords }
		} else if (selectedMode === "IP") {
			newCoords = { ...newCoords, ...ipCoords }
		} else if (selectedMode === "SEARCH") {
			newCoords = { ...newCoords, ...searchedCoords }
		}

		console.log("newCoords", newCoords)

		setIsLoadingUpdate(true)
		apiUpdatetUserLocation(newCoords).then((response) => {
			if (response.success) {
				if (response.user) {
					dispatch(authLoginSuccess(response.user))
					navigate("/users/" + userId)
					NotificationManager.success("Votre localisation a été modifiée avec succès !", null, 10000)
				}
			} else {
				setFetchErrorResponseUpdate(response)
			}
			setIsLoadingUpdate(false)
		})
	}

	// ****  RENDER  ***********************************************************
	if (auth.id !== userId)
		return (
			<>
				<h1>This is not your profile, you can't edit it !</h1>
			</>
		)

	return (
		<PageRenderEditLocation
			userId={userId}
			//*
			selectedMode={selectedMode}
			setSelectedMode={setSelectedMode}
			//*
			user={user}
			userLoading={userLoading}
			//*
			browserCoords={browserCoords}
			//*
			ipCoords={ipCoords}
			//*
			searchedCoords={searchedCoords}
			setSearchedCoords={setSearchedCoords}
			//*
			searchText={searchText}
			setSearchText={setSearchText}
			searchResult={searchResult}
			setSearchResult={setSearchResult}
			//*
			btEditClick={btEditClick}
			//********************* */

			fetchErrorResponseGet={fetchErrorResponseGet}
			fetchErrorResponseUpdate={fetchErrorResponseUpdate}
			isLoadingUpdate={isLoadingUpdate}
			isLoading={isLoadingUpdate}
			fetchErrorResponse={fetchErrorResponseUpdate}
		/>
	)
}
