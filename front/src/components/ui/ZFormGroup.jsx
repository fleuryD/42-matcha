// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import Form from "react-bootstrap/Form"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

/* *****************************************************************************
 *
 *
 *
 *	J'ai supprimé les modifs de lamine
 *
 *
 *
 ******************************************************************************/

export default function ZFormGroup({
	type,
	name,
	label,
	placeholder,
	value,
	setValue,
	error = null,
	resetError = null,
	isLoading,

	groupClassname = "",
	labelClassname = "",
	inputContainerClassName = "",
	inputClassname = "",
	frontErrorClassname = "",
	...otherProps
}) {
	// ■■■■■■■■■■■■■■■■■■■■■■■■ xxxxxxxxxxxxxx ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

	return (
		<Form.Group className={"ZFormGroup " + groupClassname}>
			{label && <Form.Label className={"ZLabel " + labelClassname}>{label}</Form.Label>}

			<div className={"ZInputContainer " + inputContainerClassName}>
				<Form.Control
					type={type}
					//data-date-format="DD MMMM YYYY"
					id={"input-" + name}
					placeholder={placeholder}
					value={value === null ? "" : value}
					className={"ZInput " + inputClassname + " " + (error ? "border-danger" : "")}
					onChange={(e) => {
						if (resetError) resetError()
						setValue(e.target.value)
					}}
					//disabled={isLoading}
					{...otherProps}
				/>
			</div>
			{error && <div className={"ZFrontError " + frontErrorClassname}>{error}</div>}
		</Form.Group>
	)
}
