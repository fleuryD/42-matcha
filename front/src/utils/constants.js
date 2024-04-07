// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export const APP_MODE = process.env.REACT_APP_APP_MODE || null
// export const APP_MODE = "DEV" // !!!!!!!!!!!!!!!!!!!!!!!!!
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || null
export const IPGEOLOCATION_API_KEY = process.env.REACT_APP_IPGEOLOCATION_API_KEY

export function checkEnv() {
	if (APP_MODE === null) console.error("REACT_APP_APP_MODE is not defined in front's .env file.")
	else if (APP_MODE !== "DEV" && APP_MODE !== "PROD") console.error("REACT_APP_APP_MODE should be `DEV` or `PROD")
	if (API_BASE_URL === null) console.error("API_BASE_URL is not defined in front's .env file.")
	if (IPGEOLOCATION_API_KEY === null) console.error("API_BASE_URL is not defined in front's .env file.")
}
