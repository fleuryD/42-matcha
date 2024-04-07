// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import Form from "react-bootstrap/Form"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function ZFormInput({
	name,
	label,
	type,
	placeholder,
	value,
	setValue,
	error = null,
	resetError = null,
	isLoading,

	groupClassname = "",
	labelClassname = "",
	inputClassname = "",
	errorClassname = "",
	...otherProps
}) {
	// ■■■■■■■■■■■■■■■■■■■■■■■■ xxxxxxxxxxxxxx ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

	return (
		<Form.Group className={groupClassname}>
			{label && <Form.Label className={labelClassname}>{label}</Form.Label>}

			<Form.Control
				type={type}
				//data-date-format="DD MMMM YYYY"
				id={"input-" + name}
				placeholder={placeholder}
				value={value === null ? "" : value}
				className={inputClassname + " " + (error ? "border-danger" : "")}
				onChange={(e) => {
					if (resetError) resetError()
					setValue(e.target.value)
				}}
				//disabled={isLoading}
				{...otherProps}
			/>
			{error && (
				<div className={errorClassname}>
					<small className="correctionOnly">[Front-Validation]</small>
					{error}
				</div>
			)}
		</Form.Group>
	)
}
