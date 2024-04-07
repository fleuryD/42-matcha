// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "store/store"
import { apiGetCityNameFromCoord, apiLocationSearch } from "api"
import ZFormInput from "components/ui/ZFormInput"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function Localisation() {
	const auth = useAppSelector((state) => state.auth)

	const [searchText, setSearchText] = useState("")
	const [searchResult, setSearchResult] = useState(null)

	const [latitude, setLatitude] = useState(0)
	const [longitude, setLongitude] = useState(0)
	const [str1, setStr1] = useState("???")
	const [cityName, setCityName] = useState("??")

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				console.log("111111111111111111111")
				// what to do once we have the position
			},
			(error) => {
				console.log("2222222222222222")
				// display an error if we cant get the users position
				console.error("Error getting user location:", error)
			}
		)
		console.log("BBBBBBBBBBBBBBBBBBBB")
		navigator.geolocation.getCurrentPosition(success, error)
		console.log("CCCCCCCCCCCCCCCCCcc")
	} else {
		console.log("Geolocation not supported")
	}

	function success(position) {
		console.log("SUCCESS")
		setLatitude(position.coords.latitude)
		setLongitude(position.coords.longitude)

		apiGetCityNameFromCoord({ latitude: position.coords.latitude, longitude: position.coords.longitude }).then(
			(data) => {
				console.log("-------------data")
				if (data.features && data.features.length > 0) {
					const city = data.features[0].properties.city
					setCityName(city)
					//return city
				} else {
					//	return "City not found"
				}
			}
		)
	}

	function error() {
		console.log("Unable to retrieve your location")
	}

	// **** FETCH x *********************************************************
	useEffect(() => {
		setSearchResult(null)

		apiLocationSearch({ searchText }).then((response) => {
			console.log("😈😈😈😈😈response", response)

			if (response.features) {
				setSearchResult(response.features)
			}
			/*
			if (response.features && response.features[0]?.properties?.city) {
				const cityName = response.features[0].properties.city
				console.log("😈😈😈😈😈 cityName", cityName)
			}
			*/
		})
	}, [searchText])

	return (
		<div className="col-12">
			<h2>Localisation</h2>
			<p>latitude: {latitude}</p>
			<p>longitude: {longitude}</p>
			<p>cityName: {cityName}</p>
			<p>
				https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port&lat={latitude}&lon={longitude}
			</p>

			<ZFormInput
				type="text"
				name="lastname"
				label="Ville, adresse, code postal"
				placeholder="Ville, adresse, code postal"
				value={searchText}
				setValue={(val) => setSearchText(val)}
				//error={frontErrors?.lastname}
				//resetError={() => setFrontErrors((errors) => ({ ...errors, lastname: null }))}
				//isLoading={isLoading}
			/>
			{searchResult &&
				searchResult.map((result, resultId) => {
					return (
						<div key={"result" + resultId + result.properties?.id}>
							***
							<b>
								{result.properties?.city} ({result.properties?.postcode})
							</b>{" "}
							{result.properties?.label}
							<small>
								[{result.geometry?.coordinates[0]}, {result.geometry?.coordinates[1]}]
							</small>
						</div>
					)
				})}
		</div>
	)
}
