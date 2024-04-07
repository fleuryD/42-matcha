// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { Ul, Li } from "./todo"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function TodoPageUsersSearch({ className = "" }) {
	const [isVisible, setIsVisible] = useState(true)

	return (
		<div className={"todoSubject  " + className}>
			<h3 onClick={() => setIsVisible(!isVisible)}>Subject.4 Research</h3>

			{isVisible && (
				<Ul>
					<Li inProgress>
						The user must be able to conduct an advanced search by selecting one or more criteria, such as:
						<Ul>
							<Li>An age gap.</Li>
							<Li>A “fame rating” gap.</Li>
							<Li>A location.</Li>
							<Li>One or multiple interest tags.</Li>
						</Ul>
					</Li>
					<Li>
						For the suggested list, the resulting list must be sortable and filterable by age, location,
						“fame rating” and tags.
					</Li>
				</Ul>
			)}
		</div>
	)
}

/*


•
•
•
•



*/
