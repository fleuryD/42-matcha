// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { Ul, Li } from "./todo"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function TodoPageUserOtherProfile({ className = "" }) {
	const [isVisible, setIsVisible] = useState(true)

	return (
		<div className={"todoSubject  " + className}>
			<h3 onClick={() => setIsVisible(!isVisible)}>Subject.5 Profile of other users</h3>

			{isVisible && (
				<Ul>
					<Li>A user must be able to view the profiles of other users.</Li>
					<Li>
						Profiles must contain all available information about them, except for the email address and
						password.
					</Li>
					<Li>When a user views a profile, it must be added to their visit history.</Li>
					<Li>
						The user must also be able to:
						<Ul>
							<Li>
								“Like” another user’s profile picture. When two people “like” each other’s profiles,
								they will be considered “connected” and can start chatting. If the current user does not
								have a profile picture, they cannot complete this action.
							</Li>
							<Li>
								You should also remove your “like” to an user whom you had previously “liked”, The user
								will no longer generate notifications, and you will not be able to chat with them
								anymore.
							</Li>
							<Li>Check the “fame rating” of another user.</Li>
							<Li>
								See if a user is currently online, and if not, see the date and time of their last
								connection.
							</Li>
							<Li>Report a user as a “fake account”.</Li>
							<Li>Block a user.</Li>
							<Li>
								A blocked user will no longer appear in the search results and will not generate
								additional notifications. And, of course, it will no longer be possible to chat with
								him.
							</Li>
							<Li>
								A user can clearly see if the profile they are viewing is connected or has “like” their
								profile and must be able to “unlike” or disconnected from that profile.
							</Li>
						</Ul>
					</Li>
				</Ul>
			)}
		</div>
	)
}
