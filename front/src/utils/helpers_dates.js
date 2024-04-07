// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { parseISO, differenceInDays, differenceInHours, differenceInMinutes } from "date-fns"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export function date_human_diff(ddte) {
	const days = ddte ? differenceInDays(new Date(), parseISO(ddte)) : null
	const hours = ddte ? differenceInHours(new Date(), parseISO(ddte)) : null
	const minutes = ddte ? differenceInMinutes(new Date(), parseISO(ddte)) : null

	if (days >= 1) return "il y a " + days + " jours"
	if (hours >= 1) return "il y a " + hours + " heures"
	return "il y a " + minutes + " minutes"
}
