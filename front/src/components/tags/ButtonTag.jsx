// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React, { useState } from "react"
import { useAppSelector, useAppDispatch } from "store/store"
import { apiAddTag, apiRemoveTag } from "api"
import { Button } from "react-bootstrap"
import { setTags } from "store/authSlice"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function ButtonTag({ userTags, tag }) {
	const auth = useAppSelector((state) => state.auth)
	const dispatch = useAppDispatch()
	const [isLoading, setIsLoading] = useState(false)

	const existingTag = auth.tags?.find((tt) => tt.id === tag.id)

	function btTagClick(userId) {
		//alert(userId)
		setIsLoading(true)

		if (!existingTag) {
			// * ADD TAG
			apiAddTag({ tagId: tag.id }).then((response) => {
				if (response.myTags) {
					console.log("response.myTags: ", response.myTags)
					dispatch(setTags({ tags: response.myTags }))
				} else if (response.error) {
					console.log("response.error: ", response.error)
				} else {
					console.log("response: ", response)
				}
				setIsLoading(false)
			})
		} else {
			// * REMOVE TAG
			apiRemoveTag({ tagId: tag.id }).then((response) => {
				if (response.myTags) {
					console.log("response.myTags", response.myTags)
					console.log("response: ", response)
					dispatch(setTags({ tags: response.myTags }))
				} else if (response.error) {
					console.log("response.error: ", response.error)
				} else {
					console.log("response: ", response)
				}
				setIsLoading(false)
			})
		}
	}

	return (
		<Button
			className="m-1 btn-xs"
			variant={existingTag ? "success" : "secondary"}
			onClick={() => btTagClick()}
			disabled={isLoading}
		>
			{tag.name}
		</Button>
	)
}

// 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓	STYLED_COMPONENTS
