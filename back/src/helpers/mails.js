// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

const nodemailer = require("nodemailer")

const { MAIL_USERNAME, MAIL_PASSWORD, MAIL_EMAIL } = require("../data/constants")

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

function getMailTextConfirmChangeEmail(user) {
	//!! GIT_KEEP:  :  // TODO: USE .ENV
	//const urlCheckMail = "http://localhost:3009/auth/check-email/" + user.email_token
	const urlCheckMail = "http://localhost:3009/auth/check-email/" + user.email_token

	let htmlStr = "<p>Salut <b>" + user.username + "</b><br/>"
	htmlStr += "</b>Tu as fais une demande pour changer ton adresse email sur <b>Matcha4Geeks</b>."
	htmlStr += `<a href="/${urlCheckMail}" target="_blank" rel="noreferrer"	>Verifie ton adresse email</a> en cliquant sur le lien suivant: `
	htmlStr += "<br /><br />"
	htmlStr += ""
	htmlStr += "Si le lien ne s'affiche pas, t'es un geek, tu sait quoi faire avec l'URL suivante:<br />"
	htmlStr += urlCheckMail
	htmlStr += "<br />Bisous."
	htmlStr += "</p>"

	return htmlStr
}

function getMailTextConfirmEmail(user) {
	//!! GIT_KEEP:  :  // TODO: USE .ENV
	const urlCheckMail = "http://localhost:3009/auth/check-email/" + user.email_token

	let htmlStr = "<p>Salut <b>" + user.username + "</b><br/>"
	htmlStr += "</b>Valide ton sincription sur <b>Matcha4Geeks</b> en cliquant sur le lien suivant: "
	htmlStr += `<a href="/${urlCheckMail}" target="_blank" rel="noreferrer"	>Verifie ton adresse email</a>`
	htmlStr += "<br /><br />"
	htmlStr += ""
	htmlStr += "Si le lien ne s'affiche pas, t'es un geek, tu sait quoi faire avec l'URL suivante:<br />"
	htmlStr += urlCheckMail
	htmlStr += "<br />Bisous."
	htmlStr += "</p>"

	return htmlStr
}

async function sendMail({ to, subject, html }) {
	var transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: MAIL_USERNAME,
			pass: MAIL_PASSWORD,
		},
	})

	var mailOptions = {
		from: MAIL_EMAIL,
		to: to,
		subject: subject,
		html: html,
	}

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error)
		} else {
			console.log("Email sent: " + info.response)
		}
	})
}

async function sendMailComfirmChangeEmail(user) {
	await sendMail({
		//!! GIT_KEEP:  :  user.email
		to: "user.email", // DEBUG	::	user.email
		subject: "Matcha4Geeks: Valide ton changement d'adresse eMail",
		html: getMailTextConfirmChangeEmail(user),
	})
}

async function sendMailRegisterComfirmEmail(user) {
	await sendMail({
		to: user.email,
		subject: "Matcha4Geeks: Valide ton inscription",
		html: getMailTextConfirmEmail(user),
	})
}

module.exports = {
	//getMailTextConfirmEmail,
	// sendMail,
	sendMailRegisterComfirmEmail,
	sendMailComfirmChangeEmail,
}
