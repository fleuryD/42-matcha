/* eslint-disable react/jsx-props-no-spreading */

// ** ignoré dans .prettierignore

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import React from "react"

/*

import {
	FaEye,
	// ++++++++++
	FaUser,
	FaUsers,
	FaUserSlash,
	FaUserCheck,
	FaUserClock,
	FaUserPlus,
	FaUserMinus,
	FaUserEdit,
	FaUserTimes,
	FaUserCog,
	FaUserLock,
	FaUserShield,
	FaPrint,
	FaAngleDown,
	FaAngleUp,

	// FaRegSmileWink,
	,
	FaBan,
	FaHome,
	,
	FaCheck,
	FaTimes,
	FaExclamationTriangle,
	FaCartArrowDown,
	FaLock,
	FaLockOpen,
	FaEnvelope,
	FaWrench,
	// window size
	FaWindowMaximize,
	FaWindowMinimize,
	FaWindowRestore,
	FaWindowClose,
	FaMapMarkedAlt,
	FaPhone,
	FaFlag,FaStar,FaRegStar
} from "react-icons/fa"

import { VscSplitVertical, VscSplitHorizontal } from "react-icons/vsc"
import { AiOutlineColumnHeight, AiOutlineColumnWidth } from "react-icons/ai"
import { BiLeftArrow, BiRightArrow } from "react-icons/bi"
import {
	BsClockHistory,
	BsArrowReturnRight,
	BsZoomIn,
	BsZoomOut,
} from "react-icons/bs"
import { GiFarmer } from "react-icons/gi"

*/

//■■■■■■■■■■■■■■■■■■■■■■■■■

import { PiGenderMaleFill, PiGenderFemaleFill, PiGenderNonbinaryFill } from "react-icons/pi"
// import { GrUserAdmin } from "react-icons/gr";
import { FaSearch, FaQuestion, FaPlus, FaEdit, FaTrashAlt, FaKey } from "react-icons/fa"
import { FaShieldHalved, FaCircleExclamation } from "react-icons/fa6"

import { BsStarFill /*, BsGeoAlt */ } from "react-icons/bs"

import { FaBan, FaHeart, FaHeartBroken, FaUserSlash, FaEye, FaBell } from "react-icons/fa"
import { FaHeartCircleBolt, FaArrowRightFromBracket, FaArrowRightToBracket, FaArrowsUpToLine } from "react-icons/fa6"
//import { SiGooglemaps } from "react-icons/si"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// *************	MATCHA	********************

export function IcoGenderM(props) {
	return <PiGenderMaleFill {...props} />
}
export function IcoGenderF(props) {
	return <PiGenderFemaleFill {...props} />
}
export function IcoGenderNB(props) {
	return <PiGenderNonbinaryFill {...props} />
}

export function IcoUsersBrowsing(props) {
	return <FaSearch {...props} />
}

export function IcoNotification(props) {
	return <FaBell {...props} />
}

export function IcoFame(props) {
	return <BsStarFill {...props} />
}
export function IcoAdmin(props) {
	return <FaShieldHalved {...props} />
}

export function IcoMatch(props) {
	return <FaHeartCircleBolt {...props} />
}
export function IcoCantLike(props) {
	return <FaHeartBroken {...props} />
}
export function IcoLike(props) {
	return <FaHeart {...props} />
}
export function IcoVisit(props) {
	return <FaEye {...props} />
}
export function IcoBlock(props) {
	return <FaBan {...props} />
}
export function IcoFake(props) {
	return <FaUserSlash {...props} />
}

export function IcoQuestion(props) {
	return <FaQuestion {...props} />
}

export function IcoExclamation(props) {
	return <FaCircleExclamation {...props} />
}

export function IcoKey(props) {
	return <FaKey {...props} />
}

// *************	CRUD	********************

export function IcoPlus(props) {
	return <FaPlus {...props} />
}
export function IcoDelete(props) {
	return <FaTrashAlt {...props} />
}
export function IcoEdit(props) {
	return <FaEdit {...props} />
}

// *************	REGISTER/LOGIN/LOGGOUT	********************

export function IcoRegister(props) {
	return <FaArrowsUpToLine {...props} />
}
export function IcoLogin(props) {
	return <FaArrowRightToBracket {...props} />
}
export function IcoLogout(props) {
	return <FaArrowRightFromBracket {...props} />
}

/*

// *************	NEW in CMZEDT OU GREA - a ajouter sur les autres sites	********************


export function IcoMapAlt(props)		{	return <FaMapMarkedAlt		{...props} />}
export function IcoPhone(props)			{	return <FaPhone			{...props} />}
export function IcoFlag(props)			{	return <FaFlag			{...props} />}
export function IcoFarmer(props)		{	return <GiFarmer		{...props} />}
export function IcoStar(props)			{	return <FaStar			{...props} />}
export function IcoStarOutline(props)	{	return <FaRegStar		{...props} />}

// *************	NEW in CMZEDT - a ajouter sur les autres sites	********************



export function IcoEye(props) {		return <FaEye {...props} />
}
export function IcoMail(props) {	return <FaEnvelope {...props} />}
export function IcoOutil(props) {	return <FaWrench {...props} />}
export function IcoPrint(props) {	return <FaPrint {...props} />}
export function IcoZoomIn(props) {	return <BsZoomIn {...props} />}
export function IcoZoomOut(props) {	return <BsZoomOut {...props} />}



// *************	window size	********************

export function IcoWindowMaximize(props) { return <FaWindowMaximize {...props} />}
export function IcoWindowMinimize(props) { return <FaWindowMinimize {...props} />}
export function IcoWindowRestore(props) {  return <FaWindowRestore {...props} />}
export function IcoWindowClose(props) {	return <FaWindowClose {...props} />}

// FaKey

// *************	USER	********************
export function IcoUserSlash(props) {	return <FaUserSlash {...props} />}
export function IcoUsers(props) {	return <FaUsers {...props} />}
export function IcoUser(props) {	return <FaUser {...props} />}
export function IcoUserPlus(props) {	return <FaUserPlus {...props} />}
export function IcoUserMinus(props) {	return <FaUserMinus {...props} />}
export function IcoUserTimes(props) {	return <FaUserTimes {...props} />}
export function IcoUserEdit(props) {	return <FaUserEdit {...props} />}
export function IcoUserCheck(props) {	return <FaUserCheck {...props} />}
export function IcoUserClock(props) {	return <FaUserClock {...props} />}
export function IcoUserCog(props) {	return <FaUserCog {...props} />}
export function IcoUserLock(props) {	return <FaUserLock {...props} />}
export function IcoUserShield(props) {	return <FaUserShield {...props} />}

// *************	Triangle / Arrow	********************

export function IcoTriangleLeft(props) {	return <BiLeftArrow {...props} />}
export function IcoTriangleRight(props) {	return <BiRightArrow {...props} />}
export function IcoArrowDownRight(props) {	return <BsArrowReturnRight {...props} />}
export function IcoAngleDown(props) {	return <FaAngleDown {...props} />}
export function IcoAngleUp(props) {	return <FaAngleUp {...props} />}

// *************	XXXXXX	********************

export function IcoHome(props) {	return <FaHome {...props} />}
export function IcoBan(props) {	return <FaBan {...props} />}
export function IcoKey(props) {	return <FaKey {...props} />}
export function IcoTrue(props) {	return <FaCheck {...props} />}
export function IcoFalse(props) {	return <FaTimes {...props} />}
export function IcoDanger(props) {   return <FaExclamationTriangle {...props} />}
export function IcoSearch(props) {	return <FaSearch {...props} />}
export function IcoBell(props) {	return <FaBell {...props} />}
export function IcoPeriode(props) {	return <BsClockHistory {...props} />}

// *************	XXXXXX	********************

export function IcoSplitVertical(props) {	return <VscSplitVertical {...props} />}
export function IcoSplitHorizontal(props) {	return <VscSplitHorizontal {...props} />}
export function IcoHeight(props) {	return <AiOutlineColumnHeight {...props} />}
export function IcoWidth(props) {	return <AiOutlineColumnWidth {...props} />}
export function IcoPanierAdd(props) {	return <FaCartArrowDown {...props} />}
export function IcoLocked(props) {	return <FaLock {...props} />}
export function IcoUnlocked(props) {	return <FaLockOpen {...props} />}

// *************	XXXXXX	********************


*/
