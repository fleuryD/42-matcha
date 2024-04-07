// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
var express = require("express")
var router = express.Router()
var cors = require("cors")

const { logRoute, logDebug, logError } = require("../helpers/logs.helper")
const { generateRandomString } = require("../helpers/helper")
var methods = require("../helpers/methods")

const { updateUserPicture } = require("../repositories/users.repository")

const multer = require("multer")
const fs = require("fs")
const path = require("path")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

router.use(cors({ allowedOrigins: ["*"] }))

const pathImagesUpload = "src/assets/users_img/uploaded"
const pathImagesFixtures = "src/assets/users_img/fixtures"

const uploadSingle = multer({
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, pathImagesUpload)
		},

		filename: function (req, file, cb) {
			const newFilename =
				"user_upload_" + Date.now() + "_" + generateRandomString(5, false) + path.extname(file.originalname)
			cb(null, newFilename)
		},

		limits: {
			fileSize: 10000000,
		},
		fileFilter(req, file, cb) {
			if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
				console.log("INVQLID FOPR?QTttttt")
				return cb(new Error("Please upload a valid image file"))
			}
			cb(undefined, true)
		},
		onError: function (req, file) {
			console.log("eerrrr")
			//cb(null, `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`)
		},
	}),
})

// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

// **************************************************

/*
 *	when the connected user upload a picture
 *
 */
router.post(
	"/upload-image/:imageNumber",
	methods.ensureAccessToken,
	uploadSingle.single("image"),
	async function (req, res, next) {
		logRoute(res, "🧖📸 POST", "/users/upload-image")
		try {
			const connectedUserId = res.locals.connectedUser.id
			const imageNumber = req.params.imageNumber
			if (req.file?.filename) {
				const filename = req.file.filename
				if (!imageNumber || imageNumber > 5 || imageNumber < 1) {
					imageNumber = 1
				}
				user = await updateUserPicture({
					userId: connectedUserId,
					filename: filename,
					pictureNumber: imageNumber,
				})
				return res.json({ filename, aa: "aaaaaaaaaaaa" })
			}
			return res.json({ error: "no filename !!!!!!!!!!!!!!!!!!!!!!!!!!!!" })
		} catch (e) {
			console.log("error: ", e)
			return res.json({ error: e.message })
		}
	}
)

// **************************************************

/*
 *	get a private image
 *
 */
router.get("/images/:imageName", methods.ensureAccessToken, async function (req, res, next) {
	try {
		const imageName = req.params.imageName

		// * note: les images "fixtures" finissent par ".extension"
		// * alors que les images uploades n'ont pas d'extension, ni de "."
		let pathImages = imageName.includes("user_upload") ? pathImagesUpload : pathImagesFixtures

		const options = {
			root: path.join(pathImages),
		}
		res.sendFile(imageName, options, function (err) {
			if (err) {
				console.error("Error sending file:", err)
				return res.json({ error: err })
			} else {
				console.log("Sent:", imageName)
			}
		})
	} catch (e) {
		console.log("error: ", e)
		return res.json({ error: e.message })
	}
})
/*
 *	get a private image
 *
 */
router.post("/images/:imageName", methods.ensureAccessTokenOrSuperPassword, async function (req, res, next) {
	try {
		const imageName = req.params.imageName

		// * note: les images "fixtures" finissent par ".extension"
		// * alors que les images uploades n'ont pas d'extension, ni de "."
		let pathImages = imageName.includes("user_upload") ? pathImagesUpload : pathImagesFixtures

		const options = {
			root: path.join(pathImages),
		}
		res.sendFile(imageName, options, function (err) {
			if (err) {
				console.error("Error sending file:", err)
				return res.json({ error: err })
			} else {
				console.log("Sent:", imageName)
			}
		})
	} catch (e) {
		console.log("error: ", e)
		return res.json({ error: e.message })
	}
})

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

module.exports = router
