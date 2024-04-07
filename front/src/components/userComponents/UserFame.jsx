// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { IcoFame } from "components/ui/zIcones"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

/**
 *
 *	@name : UserCardsContainer
 *
 *
 *	@desc :
 *		Container qui contient les userCard (quand on fait une recherche d'users).
 *		Pour chaque users, on affiche un UserCard.
 *		Ensuite, dans ce container on affiche un div avec:
 *			- le nombre d'users affiches
 *			- Loading
 *			- Le bouton `load more`
 *
 *
 *	@used_in : PageUsersBrowsing
 *
 */

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
export default function UserFame({ user, className = "" }) {
	return (
		<div className={className}>
			<IcoFame /> {user.fame}
		</div>
	)
}
