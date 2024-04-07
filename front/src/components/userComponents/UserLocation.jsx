// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { useAppSelector } from "store/store"
import { BsGeoAlt } from "react-icons/bs"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

/**
 *
 * @usedIn	UserCard, UserProfilInfos
 * @returns
 */
export default function UserLocation({ user, className = "", showCoords = false }) {
	const auth = useAppSelector((state) => state.auth)

	return (
		<div className={"user-location " + className}>
			<BsGeoAlt />{" "}
			{user.latitude && user.longitude ? (
				<a
					href={"https://www.google.com/maps/search/" + user.latitude + "," + user.longitude}
					target="_blank"
					rel="noreferrer"
					className="user-location"
				>
					{user.city}
					{auth.id !== user.id && user.distance !== null && user.distance !== undefined && (
						<span> ({Math.floor(user.distance)} km)</span>
					)}
					{showCoords && (
						<small>
							{" "}
							[{user.latitude}, {user.longitude}]
						</small>
					)}
				</a>
			) : (
				<>
					{user.city}
					{auth.id !== user.id && user.distance !== null && user.distance !== undefined && (
						<span>({Math.floor(user.distance)} km)</span>
					)}
				</>
			)}
		</div>
	)
}
