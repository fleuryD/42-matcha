// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { IcoLike, IcoBlock, IcoFake, IcoVisit } from "components/ui/zIcones"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function UserFameDetails({ user, className = "", ...otherProps }) {
	return (
		<div className={className} {...otherProps}>
			<span>
				{user.count_liked} <IcoLike />
				&nbsp;&nbsp;&nbsp;
			</span>
			<span>
				{user.count_visited} <IcoVisit />
				&nbsp;&nbsp;&nbsp;
			</span>
			<span>
				{user.count_blocked} <IcoBlock />
				&nbsp;&nbsp;&nbsp;
			</span>
			<span>
				{user.count_faked} <IcoFake />
				&nbsp;&nbsp;&nbsp;
			</span>
		</div>
	)
}
