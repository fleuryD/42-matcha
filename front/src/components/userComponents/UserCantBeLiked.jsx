// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { useAppSelector } from "store/store"
import {
	IcoGenderM,
	IcoGenderF,
	IcoGenderNB,
	IcoFame,
	IcoCantLike,
	IcoLike,
	IcoBlock,
	IcoMatch,
} from "components/ui/zIcones"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

/**
 *
 * @usedIn	UserCard, UserProfilInfos
 * @returns
 */
export default function UserCantBeLiked({ className = "" }) {
	return (
		<div className={"user-cantbeliked " + className}>
			<IcoCantLike /> Tu ne peux pas kiffer un-e utilisateur-ice sans photo !
		</div>
	)
}
