// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { styled } from "styled-components"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

//!! GIT_KEEP:  : rename : ZLoading
//export default function ZFormInput({
export default function ZLoading({
	name,
	label,
	type,
	placeholder,
	value,
	setValue,
	error = null,
	resetError = null,
	isLoading,
	...otherProps
}) {
	// ■■■■■■■■■■■■■■■■■■■■■■■■ xxxxxxxxxxxxxx ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

	return <StyledLoader className="loader"></StyledLoader>
}

// source : https://css-loaders.com/arcade/

const factorW = 2
const factorH = 1

const StyledLoader = styled.div`
	width: ${factorW * 90}px;
	height: ${factorH * 24}px;
	padding: ${factorW * 2}px 0;
	box-sizing: border-box;
	display: flex;
	animation: l5-0 3s infinite steps(6);
	background:
		linear-gradient(#000 0 0) 0 0/0% 100% no-repeat,
		radial-gradient(circle ${factorH * 3}px, #eeee89 90%, #0000) 0 0/20% 100% #000;
	overflow: hidden;

	&::before {
		content: "";
		width: ${factorH * 20}px;
		transform: translate(-100%);
		border-radius: 50%;
		background: #ffff2d;
		animation:
			l5-1 0.25s 0.153s infinite steps(5) alternate,
			l5-2 3s infinite linear;
	}
	@keyframes l5-1 {
		0% {
			clip-path: polygon(50% 50%, 100% 0, 100% 0, 0 0, 0 100%, 100% 100%, 100% 100%);
		}
		100% {
			clip-path: polygon(50% 50%, 100% 65%, 100% 0, 0 0, 0 100%, 100% 100%, 100% 35%);
		}
	}
	@keyframes l5-2 {
		100% {
			transform: translate(${factorW * 90}px);
		}
	}
	@keyframes l5-0 {
		100% {
			background-size:
				120% 100%,
				20% 100%;
		}
	}
`
