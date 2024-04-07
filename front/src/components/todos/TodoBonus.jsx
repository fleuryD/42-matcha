// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { Ul, Li } from "./todo"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function TodoBonus({ className = "" }) {
	const [isVisible, setIsVisible] = useState(true)

	return (
		<div className={"todoSubject  " + className}>
			<h3 onClick={() => setIsVisible(!isVisible)}>Subject.Bonus</h3>

			{isVisible && (
				<Ul>
					<Li>
						Possible bonuses that you can implement to get extra points.
						<Ul>
							<Li>Add Omniauth strategies for user authentication.</Li>
							<Li>Allow importing pictures from social network(snapchat, facebook, Google+, etc.).</Li>
							<Li>
								Develop an interactive map of users, which requires more precise GPS localization via
								JavaScript.
							</Li>
							<Li>Integration of video or audio chat for connected users.</Li>
							<Li>
								Implementation of a feature to schedule and organize real-life dates or events for
								matched users.
							</Li>
						</Ul>
					</Li>
				</Ul>
			)}
		</div>
	)
}

/*







*/
