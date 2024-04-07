// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { Ul, Li } from "./todo"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function TodoPageUsersBrowsing({ className = "" }) {
	const [isVisible, setIsVisible] = useState(true)

	return (
		<div className={"todoSubject  " + className}>
			<h3 onClick={() => setIsVisible(!isVisible)}>Subject.3 Browsing</h3>

			{isVisible && (
				<>
					<Ul>
						<Li>The user must be able to easily get a List of suggestions that match their profile.</Li>
						<Li>
							You will only propose “interesting” profiles. For example, only men for a hetero-sexual
							girls.
						</Li>
						<Li>
							<del>
								You must manage bisexuality.If the user’s orientation isn’t specified, they will be
								considered bisexual.
							</del>
							<br />
							<i>
								[Dans mon projet, l'utilisateur doit indiquer ses préférences sexuelles a l'inscription
								!]
							</i>
						</Li>
						<Li>
							You must cleverly match (Weight at least several criterias) based on:
							<Ul>
								<Li>Same geographic area as the user.</Li>
								<Li>A maximum of common tags.</Li>
								<Li>A maximum “fame rating”.</Li>
							</Ul>
						</Li>
						<Li>You must prioritize showing people from the same geographical area.</Li>
						<Li>The list must be sortable by age, location, “fame rating”, and common tags.</Li>
						<Li>The list must be filterable by age, location, “fame rating”, and common tags.</Li>
					</Ul>

					<h3>Todo</h3>
					<Ul>
						<Li>
							Si l'utilisateur connecte n'a pas de localisation ou un minimum de tags, il ne peut pas
							explorer
						</Li>
						<Li>ya un bug sur le common_tags_count</Li>
						<Li>update fame quand on like ou unlike ?</Li>
					</Ul>
				</>
			)}
		</div>
	)
}
