// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { useAppSelector } from "store/store"

import { IcoGenderM, IcoGenderF, IcoGenderNB } from "components/ui/zIcones"
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

/**
 *
 * @usedIn	UserCard, UserProfilInfos
 * @returns
 */
export default function UserGender({ gender, className = "" }) {
	//const auth = useAppSelector((state) => state.auth)

	return (
		<span className={className}>
			{gender === "M" ? <IcoGenderM /> : gender === "F" ? <IcoGenderF /> : <IcoGenderNB />}
		</span>
	)
}
