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

import ErrorCustom from "components/ui/ErrorCustom"
import ZLoading from "components/ui/ZLoading"
import Form from "react-bootstrap/Form"

import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { UserLocation } from "components/userComponents"

import "./editLocalisation.scss"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageRenderEditLocation({
	userId,
	// * the location mode selected by the user
	// * "PROFIL" | "BROWSER" | "IP" | "SEARCH"
	selectedMode,
	setSelectedMode,

	// * {id, latitude, longitude, city} from user's profil :
	user,
	userLoading,

	// * {latitude, longitude} from `navigator.geolocation.getCurrentPosition`
	// * then {city} from api
	browserCoords,

	// * {ip} from `navigator.geolocation.getCurrentPosition`
	// * then {latitude, longitude, city} from api
	ipCoords,

	// *  {latitude, longitude, city} from search api
	searchedCoords,
	setSearchedCoords,
	// *
	searchText,
	setSearchText,
	searchResult,
	setSearchResult,

	//********************* */

	fetchErrorResponseGet,
	fetchErrorResponseUpdate,

	isLoadingUpdate,
	btEditClick,
	isLoading,

	fetchErrorResponse,
}) {
	// **** RENDER: LOADING, ERROR:

	if (fetchErrorResponseGet) return <ErrorCustom response={fetchErrorResponseGet} />
	if (userLoading) return <ZLoading />
	if (!user) return <p>Ni Loading, ni error, ni user (ne devrait pas arriver)</p>

	// **** RENDER: EDIT MY PROFIL:

	return (
		<div className="AppPage" id="PageEditLocalisation">
			<header id="AppPageHeader">
				<h1>Modifies tes infos de localisation</h1>
				<p>Lorem ipsum</p>
			</header>
			<div id="AppPageContent"></div>
			<div className=" d-flex justify-content-center">
				<Form className="row col-12 col-md-8  col-lg-6   col-xl-5   col-xxl-3">
					{/*
					// *************************************	CURRENT PROFIL LOCATION
					*/}
					<div
						className={
							`border-bottom border-primary mb-2 pt-2 ` +
							(selectedMode === "PROFIL" ? " bg-success " : "")
						}
					>
						<h3>
							<Form.Check
								type="radio"
								name="radio-selectedMode"
								id="radio-selectedMode-profil"
								checked={selectedMode === "PROFIL"}
								onChange={() => {}}
								onClick={() => setSelectedMode("PROFIL")}
								label="Garder la position definie dans ton profil"
							/>
						</h3>
						<UserLocation user={user} className="mb-3 mt-3" showCoords />
					</div>

					{/*
					// *************************************	BROWSER LOCATION
					*/}

					<div
						className={
							`border-bottom border-primary mb-2 pt-2 ` +
							(selectedMode === "BROWSER" ? " bg-success " : "")
						}
					>
						<h3>
							<Form.Check
								type="radio"
								name="radio-selectedMode"
								id={`radio-selectedMode-browser`}
								checked={selectedMode === "BROWSER"}
								onChange={() => {}}
								onClick={() => {
									if (browserCoords?.latitude && browserCoords?.longitude) setSelectedMode("BROWSER")
								}}
								label="Utiliser la position definie par le navigateur"
							/>
						</h3>

						{browserCoords ? (
							<UserLocation user={browserCoords} className="mb-3 mt-3" showCoords />
						) : (
							<div>
								<p className="text-danger">Impossible de te localiser via le navigateur</p>
								<p className="text-danger">Ne fonctionne pas sur firefox@42</p>
							</div>
						)}
					</div>

					{/*
					// *************************************	IP LOCATION
					*/}

					<div
						className={
							`border-bottom border-primary mb-2 pt-2 ` + (selectedMode === "IP" ? " bg-success " : "")
						}
					>
						<h3>
							<Form.Check
								type="radio"
								name="radio-selectedMode"
								id={`radio-selectedMode-ip`}
								checked={selectedMode === "IP"}
								onChange={() => {}}
								onClick={() => {
									if (ipCoords?.latitude && ipCoords?.longitude) setSelectedMode("IP")
								}}
								label="Utiliser la position definie par ton adresse IP"
							/>
						</h3>
						<p>Ton IP: {ipCoords?.ip}</p>
						{ipCoords ? (
							<UserLocation user={ipCoords} className="mb-3 mt-3" showCoords />
						) : (
							<div>
								<p className="text-danger">Impossible de te localiser via l'adresse IP</p>
							</div>
						)}
					</div>

					{/*
					// *************************************	SEARCH LOCATION
					*/}
					<div id="localisationSearch" className="mb-2 pt-2">
						<div className={selectedMode === "SEARCH" ? " bg-success p-1 " : ""}>
							<h3>
								<Form.Check
									type="radio"
									name="radio-selectedMode"
									id={`radio-selectedMode-search`}
									checked={selectedMode === "SEARCH" ? true : false}
									onChange={() => {}}
									onClick={() => {
										if (searchedCoords) setSelectedMode("SEARCH")
									}}
									label="Position personnalisee (en France seulement)"
								/>
							</h3>
							{searchedCoords && <UserLocation user={searchedCoords} className="mb-3 mt-3" showCoords />}
						</div>
						<Form.Control
							type="text"
							id="input-search"
							placeholder="ville, rue..."
							value={searchText === null ? "" : searchText}
							className="col-6"
							onChange={(e) => {
								setSearchText(e.target.value)
							}}
						/>
						<div id="searchResults">
							{searchResult && searchResult.length === 0 && <>Auncun resultat !</>}

							{searchResult &&
								searchResult.map((result, resultId) => {
									return (
										<div
											key={"result" + resultId + result.properties?.id}
											className="searchResultsItem"
											onClick={() => {
												setSearchedCoords({
													longitude: result.geometry?.coordinates[0] || 0.0,
													latitude: result.geometry?.coordinates[1] || 0.0,
													city: result.properties?.city || null,
												})
												setSelectedMode("SEARCH")
												setSearchResult(null)
												setSearchText("")
											}}
										>
											<b>
												{result.properties?.city} ({result.properties?.postcode})
											</b>{" "}
											{result.properties?.label
												.replace(result.properties?.city, "")
												.replace(result.properties?.postcode, "")}
										</div>
									)
								})}
						</div>
					</div>
					{fetchErrorResponse && <ErrorCustom response={fetchErrorResponse} />}

					<div className="mt-4">
						<Button as={Link} to={"/users/" + userId} variant="danger" className="" disabled={isLoading}>
							Annuler
						</Button>
						<Button
							variant="warning"
							className="float-end"
							onClick={() => btEditClick()}
							disabled={isLoading}
						>
							Modifier
						</Button>
					</div>
				</Form>
			</div>
		</div>
	)
}
