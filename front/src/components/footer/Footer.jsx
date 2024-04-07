// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { FaGithub, FaGithubSquare, FaLinkedin, FaUserGraduate } from "react-icons/fa"

import "./footer.scss"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function Footer() {
	return (
		<div className="box">
			<h1>
				Matcha4Geeks
			</h1>
			<div className="footerContainer">

				<div className="footerRow">
					<div className="footerColumn">		
										
						<div className="footerColumnHeading">Projet</div>
						<a className="footerLink" href="https://github.com/fleuryD/42MatchaGroup" target="_blank" rel="noreferrer">
							<FaGithub /> Repository GitHub Group
						</a>
						<a className="footerLink" href="https://github.com/fleuryD/42Matcha" target="_blank" rel="noreferrer">
							<FaGithub /> Repository GitHub
						</a>
						<a className="footerLink"
							href="https://projects.intra.42.fr/projects/42cursus-matcha"
							target="_blank"
							rel="noreferrer"
						>
							Intra 42
						</a>
						<a className="footerLink"
							href="https://cdn.intra.42.fr/pdf/pdf/88549/en.subject.pdf"
							target="_blank"
							rel="noreferrer"
						>
							Sujet (Intra 42)
						</a>
						<a className="footerLink"
							href="https://appdesigner.zedixi.com/projects/6/uml"
							target="_blank"
							rel="noreferrer"
						>
							appDesigner
						</a>
					</div>
					{/* <Column>
						<Heading>Zzzzzzzzzz</Heading>
						<a className="footerLink" href="#">Zzzzzzzzzz</a>
						<a className="footerLink" href="#">Zzzzzzzzzz</a>
						<a className="footerLink" href="#">Zzzzzzzzzz</a>
					</Column> */}
					<div className="footerColumn">	
						<div className="footerColumnHeading">Contact dfleury - David</div>
						<a className="footerLink" href="https://github.com/fleuryD" target="_blank" rel="noreferrer">
							<FaGithubSquare /> Profil GitHub
						</a>
						<a className="footerLink" href="https://profile.intra.42.fr/users/dfleury/" target="_blank" rel="noreferrer">
							<FaUserGraduate /> Profil Intra 42
						</a>
						<a className="footerLink" href="https://www.linkedin.com/in/fleury-david/" target="_blank" rel="noreferrer">
							<FaLinkedin /> Profil LinkedIn
						</a>
					</div>
					<div className="footerColumn">	
						<div className="footerColumnHeading">Contact mabdali - Lamine</div>
						<a className="footerLink" href="#">
							<FaGithubSquare /> Profil GitHub
						</a>
						<a className="footerLink" href="#">
							<FaUserGraduate /> Profil Intra 42
						</a>
						<a className="footerLink" href="#">
							<FaLinkedin /> Profil LinkedIn
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
