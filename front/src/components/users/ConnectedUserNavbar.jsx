// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { styled } from "styled-components"
import { useAppSelector } from "store/store"
import LocalisationLink from "components/localisation/LocalisationLink"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function ConnectedUserNavbar() {
	const auth = useAppSelector((state) => state.auth)
	return (
		<StyledConnectedUserNavbar className=" col-12" id="ConnectedUserNavbar">
			<div className="">
				<b>{auth.username}</b> <small>({auth.email})</small>
			</div>
			<br />
			<div className="keyVal">
				<b>.isConnected:</b> {auth.isConnected ? "oui" : "non"}
			</div>

			<div className="keyVal">
				<b>.gender:</b> {auth.gender}
			</div>
			<div className="keyVal">
				<b>.love:</b> [{auth.loveM && "M"} {auth.loveF && "F"} {auth.loveNB && "NB"}]
			</div>
			<div className="keyVal">
				<b>.location:</b> [
				<LocalisationLink latitude={auth.latitude} longitude={auth.longitude} city={auth.city} />]
			</div>
			<div className="keyVal">
				<h3>
					.fame: <b>{auth.fame}</b>
				</h3>
			</div>
		</StyledConnectedUserNavbar>
	)
}

// 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓	STYLED_COMPONENTS

const StyledConnectedUserNavbar = styled.div`
	border: 1px solid red;
	background-color: #222222;
	color: #eeeeee;
	padding: 5px;

	position: sticky;
	top: 70px;

	div {
		display: inline-block;
		margin-bottom: 2px;
		margin-right: 15px;
		//background-color: #ffeeee;
		padding: 2px;

		small {
			font-size: 0.7em;
		}
	}
`
