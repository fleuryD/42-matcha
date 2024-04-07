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

 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React, { useState } from "react"
import axios from "axios"
import { API_BASE_URL } from "utils/constants"
import ZModal from "components/ui/ZModal"

// *■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function ProfilPicturesForm({ closeForm, imageNumber = 0 }) {
	const [file, setFile] = useState()

	if (imageNumber === 0) return

	const submit = async (event) => {
		event.preventDefault()

		const formData = new FormData()
		formData.append("image", file)

		const url = API_BASE_URL + "/images/upload-image/" + imageNumber
		await axios
			.post(url, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Accept: "application/json",
					Authorization: "Bearer " + localStorage.getItem("access_token"),
				},
			})
			.then((response) => {
				if (response.data.filename) {
					console.log("SUCCESS: ", response.data.filename)
					closeForm()
					window.location.reload() // TEMPPPPPPPPP
				}
				//return { response }
			})
			.catch((error) => {
				//return { response: error }
				console.log("error", error)
			})
	}

	return (
		<ZModal closeForm={closeForm}>
			<form onSubmit={submit}>
				<div>picture_{imageNumber}</div>
				<input
					filename={file}
					onChange={(e) => setFile(e.target.files[0])}
					type="file"
					accept="image/*"
				></input>
				<button type="submit">Submit</button>
			</form>
			{/*
			{image && <img src={image} />}
			*/}
		</ZModal>
	)
}
