// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function LocalisationLink({ latitude, longitude, city = null, distance = -1 }) {
	return (
		<small>
			<a
				href={"https://www.google.com/maps/search/" + latitude + "," + longitude}
				target="_blank"
				rel="noreferrer"
			>
				{latitude},{longitude}
			</a>
			{city && <> ({city})</>}
			{distance >= 0 && <> ({Math.floor(distance)} km)</>}
		</small>
	)
}
