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
export default function UserLoves({ user, className = "", prefix = "aime" }) {
	const auth = useAppSelector((state) => state.auth)

	return (
		<div className={className}>
			{auth.id === user.id ? <>Tu aimes les </> : <>Aime les </>}
			<span style={{ fontSize: "1.5em" }}>
				{user.love_m && <IcoGenderM />}
				{user.love_f && <IcoGenderF />}
				{user.love_nb && <IcoGenderNB />}
			</span>
		</div>
	)
}
