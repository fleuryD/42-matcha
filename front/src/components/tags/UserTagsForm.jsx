// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { apiFetchTags } from "api"
import { Button } from "react-bootstrap"
import ButtonTag from "components/tags/ButtonTag"
import ZModal from "components/ui/ZModal"
import { useAppSelector } from "store/store"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function UserTagsForm({ user, className, closeForm }) {
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const [tags, setTags] = useState(null)
	const auth = useAppSelector((state) => state.auth)

	// *** on form opening, fetch all tags:
	useEffect(() => {
		apiFetchTags().then((response) => {
			if (response.error) {
				console.log("response: ", response)
				setError("Error Inconnue: Voir la console")
			} else {
				setTags(response.tags)
			}
			setIsLoading(false)
		})
	}, [user])

	if (!user) return null

	let previousCat = null

	console.log("######################### auth.tags", auth.tags)
	console.log("######################### user.tags", user.tags)
	console.log("######################### tags", tags)
	return (
		<ZModal className={"z-cadre " + className} closeForm={closeForm}>
			<div>
				<h2>Editer mes centres d'interet</h2>

				{isLoading && <p>Loading...</p>}
				{error && <p>{error}</p>}

				{tags &&
					tags.map((tag) => {
						const showCat = !previousCat || previousCat !== tag.category
						previousCat = tag.category

						return (
							<span key={"tag-" + tag.id}>
								{showCat && <h3>{tag.category}</h3>}
								<ButtonTag userTags={user.tags} tag={tag} />
							</span>
						)
					})}
			</div>
		</ZModal>
	)
}

// 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓	STYLED_COMPONENTS
