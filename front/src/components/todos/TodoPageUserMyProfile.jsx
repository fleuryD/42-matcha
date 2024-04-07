// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { Ul, Li } from "./todo"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function TodoPageUserMyProfile({ className = "" }) {
	const [isVisible, setIsVisible] = useState(true)

	return (
		<div className={"todoSubject  " + className}>
			<h3 onClick={() => setIsVisible(!isVisible)}>Subject.2 User profile</h3>

			{isVisible && (
				<Ul>
					<Li inProgress>
						Once a user is connected, they must fill out their profile by providing the following
						information:
						<Ul>
							<Li>The gender.</Li>
							<Li>Sexual preferences.</Li>
							<Li>A biography.</Li>
							<Li>
								A list of interests with tags (e.g. #vegan, #geek, #piercing, etc.), which must be
								reusable
							</Li>
							<Li>Up to 5 pictures, including one to be used as a profile picture.</Li>
						</Ul>
					</Li>

					<Li>
						The user must be able to modify this information, as well as their last name, first name, and{" "}
						email address.
					</Li>
					<Li>The user must be able to check who has viewed their profile.</Li>
					<Li>The user must be able to check who has “liked” them.</Li>
					<Li>
						The user must have a public “fame rating”{" "}
						<small>
							(Up to you to define what “fame rating” means as long as your criteria are consistant.)
						</small>
					</Li>

					<Li inProgress>
						The user must be located using GPS positioning, up to their neighborhood.
						<Ul>
							<Li>
								If the user does not want to be positioned, you must find a way to locate them even
								without their knowledge .<small>(Yes that’s what dating websites do...)</small>{" "}
							</Li>
							<Li>The user must be able to modify their GPS position in their profile.</Li>
						</Ul>
					</Li>
				</Ul>
			)}
		</div>
	)
}
