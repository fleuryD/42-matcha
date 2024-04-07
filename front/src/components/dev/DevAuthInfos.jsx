// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { styled } from "styled-components"
import { useAppSelector } from "store/store"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function DevAuthInfos() {
	const auth = useAppSelector((state) => state.auth)
	return (
		<StyledDevAuthInfos className=" col-12">
			<div className="">
				<b>Auth:</b>
			</div>
			<div className="keyVal">
				<b>.isConnected:</b> {auth.isConnected ? "oui" : "non"}
			</div>
			<div className="keyVal">
				<b>.id:</b> {auth.id}
			</div>
			<div className="keyVal">
				<b>.username:</b> {auth.username}
			</div>
			<div className="keyVal">
				<b>.email:</b> {auth.email}
			</div>
			<div className="keyVal">
				<b>.gender:</b> {auth.gender}
			</div>
			<div className="keyVal">
				<b>.love:</b> [{auth.loveM && "M"} {auth.loveF && "F"} {auth.loveNB && "NB"}]
			</div>
			<div className="keyVal">
				<b>.tags:</b> x{auth.tags?.length}
				{/*
				<small>
					{auth.tags?.map((tag) => (
						<span key={"tag-xxx-" + tag.name}>{tag.name}, </span>
					))}
				</small>
				*/}
			</div>
			<div className="keyVal">
				<b>.latitude/.longitude/city:</b>{" "}
				<small>
					{auth.latitude}/{auth.longitude}/{auth.city}
				</small>
			</div>
			<div className="keyVal">
				<b>.accessToken:</b> <small>{auth.accessToken}</small>
			</div>
		</StyledDevAuthInfos>
	)
}

// 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓	STYLED_COMPONENTS

const StyledDevAuthInfos = styled.div`
	border: 1px solid red;
	background-color: #ffcccc;
	padding: 5px;
	div {
		display: inline-block;
		margin-bottom: 2px;
		margin-right: 15px;
		background-color: #ffeeee;
		padding: 2px;

		small {
			font-size: 0.7em;
		}
	}
`
