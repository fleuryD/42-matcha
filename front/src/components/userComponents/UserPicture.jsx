// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState, useEffect } from "react"
import { useAppSelector } from "store/store"
import { API_BASE_URL /* , getUserToken */ } from "utils/constants" // ?????????????????
//import { Buffer } from "buffer"
import { Buffer } from "buffer/"
window.Buffer = Buffer

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

/**
 *
 * 	@description
 * 		fetch et affiche un image privee du dossier asset du back
 * 		on ne peut pas y acceder en faisant src={"asset/"+filename}
 * 		on utilise l'api:  GET "/users/images/" + filename
 *
 *
 *	USAGE :
 *
 *		import UserPicture from "features/users/UserPicture"
 *		<UserPicture	filename={someUser.picture_3}	other="..."  />
 *
 *
 */

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function UserPicture({
	filename = null,
	className = "",
	alt = "",
	modeSuperPassword = false,
	...otherProps
}) {
	const [imgSrc, setImgSrc] = useState(null)
	const { superPassword } = useAppSelector((state) => state.auth)

	useEffect(() => {
		if (!filename) return

		const url = API_BASE_URL + "/images/images/" + filename
		//console.log("🧖 get Picture: url: ", url)

		const requestOptions = modeSuperPassword
			? {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ superPassword }),
				}
			: {
					method: "GET",
					headers: { Authorization: "Bearer " + localStorage.getItem("access_token") },
				}

		//console.log(requestOptions)

		if (!filename) return
		fetch(url, requestOptions)
			.then((response) => {
				if (!response.ok) {
					console.error("Network response was not ok")
					throw new Error("Network response was not ok")
				}
				return response.blob()
			})
			.then((blob) => {
				setImgSrc(window.URL.createObjectURL(blob))
			})
			.catch((error) => {
				console.error("Error fetching image:", error)
			})

		return () => {
			if (url !== null) {
				window.URL.revokeObjectURL(imgSrc)
			}
		}
	}, [filename]) // messages

	if (!filename) return

	// **** RENDER  ************************************************************

	// if (!imgSrc) return <>LoAdInG {filename}...</>
	if (!imgSrc) return <>LoAdInG ImG...</>

	if (imgSrc) return <img src={imgSrc} className={className} alt={alt} {...otherProps} />
}
