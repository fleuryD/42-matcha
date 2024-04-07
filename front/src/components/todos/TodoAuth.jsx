// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { Ul, Li } from "./todo"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function TodoAuth({ className = "" }) {
	const [isVisible, setIsVisible] = useState(true)

	return (
		<div className={"todoSubject " + className}>
			<h3 onClick={() => setIsVisible(!isVisible)}>Subject.1 Registration and Signing-in</h3>

			{isVisible && (
				<Ul>
					<Li>
						The app must allow a user to register by requesting at least their email address, username, last
						name, first name, and a password that is somehow protected.
					</Li>
					<Li>
						After registration, an email with a unique link must be sent to the registered user to verify
						their account.
					</Li>
					<Li>The user must be able to login using their username and password.</Li>
					<Li>
						The user must be able to receive an email allowing them to reset their password if they forget
						it.
					</Li>
					<Li>
						The user must be able to log out <u>with just one click</u> from any page on the site.
					</Li>
				</Ul>
			)}
		</div>
	)
}

/*





*/
