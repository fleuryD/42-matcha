// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useEffect, useState } from "react"
import { apiFetchTags } from "api"
import { Button } from "react-bootstrap"
import ButtonTag from "components/tags/ButtonTag"
import ZModal from "components/ui/ZModal"
import { useAppSelector, useAppDispatch } from "store/store"
import { setAuthSuperPassword } from "store/authSlice"
import Form from "react-bootstrap/Form"

import ZFormInput from "components/ui/ZFormInput"
import ErrorCustom from "components/ui/ErrorCustom"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function FormSuperPassword({ user, className, closeForm }) {
	const [superPassword, setSuperPassword] = useState("")
	const dispatch = useAppDispatch()

	/*
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	const auth = useAppSelector((state) => state.auth)
*/
	/*
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

	console.log("######################### auth.superPassword", auth.superPassword)
 */
	function buttonValidateClick(superPassword) {
		//console.log("superPassword", superPassword)
		dispatch(setAuthSuperPassword({ superPassword }))
		//closeForm()
		window.location.reload()
	}

	return (
		<ZModal className={"z-cadre " + className} closeForm={closeForm}>
			<div>
				<h2>Entrez le SuperPassword</h2>
				<p className="text-danger">
					Le SuperPassword est utilisé uniquement en mode DEV ou pour la CORRECTION et doit etre supprimé en
					PROD !
				</p>
				<p className="">
					Il permet de créer des fixtures (faux comptes utilisateurs) et de se connecter rapidement à
					n'importe quel compte.
				</p>

				<Form className="row col-12  mb-3 pb-4">
					<ZFormInput
						type="password"
						name="superPassword"
						label="superPassword"
						//placeholder="superPassword"
						value={superPassword}
						setValue={(val) => setSuperPassword(val)}
						//resetError={() => setSuperPassword((errors) => ({ ...errors, email: null }))}
						//isLoading={isLoading}
					/>
				</Form>
				<p className="">Laissez vide pour supprimer.</p>

				<div className="ZFormFooter mt-3">
					<Button
						className="float-end btn-success"
						onClick={() => buttonValidateClick(superPassword)}
						//disabled={isLoading}
					>
						Valider
					</Button>
				</div>

				{/*
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

					*/}
			</div>
		</ZModal>
	)
}

// 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓	STYLED_COMPONENTS
