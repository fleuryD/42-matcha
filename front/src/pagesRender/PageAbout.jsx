/**
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 **■                                                                           ■
 **■                                                        :::      ::::::::  ■
 **■                                                       :+:      :+:    :+: ■
 **■                     | |       | |                  +:+ +:+         +:+    ■
 **■    _ __ ___    __ _ | |_  ___ | |__    __ _      +#+  +:+       +#+       ■
 **■   | '_ ` _ \  / _` || __|/ __|| '_ \  / _` |   +#+#+#+#+#+   +#+          ■
 **■   | | | | | || (_| || |_| (__ | | | || (_| |        #+#    #+#            ■
 **■   |_| |_| |_| \__,_| \__|\___||_| |_| \__,_|       ###   ########.fr      ■
 **■                                                                           ■
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 *
 *	@compomentName		Xxxxxxxxxxxxxxxxxx
 *
 *
 *	@description
 *		xxxxxxxxxxxxxxxxxxxxxxxx
 *		xxxxxxxxxxxxxxxxxxxxxxxx
 *		xxxxxxxxxxxxxxxxxxxxxxxx
 *		xxxxxxxxxxxxxxxxxxxxxxxx
 *		xxxxxxxxxxxxxxxxxxxxxxxx
 *
 *
 *	@usedIn
 *		- `xxxxxxxxxx/xxxxxxxxxxxxxxxx`
 *
 *
 *
 *	@author		dfleury
 *
 *
 *
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"
import logo from "../assets/logo.png"

import TodoAuth from "components/todos/TodoAuth"
import TodoPageUserMyProfile from "components/todos/TodoPageUserMyProfile"
import TodoPageUsersBrowsing from "components/todos/TodoPageUsersBrowsing"
import TodoPageUsersSearch from "components/todos/TodoPageUsersSearch"
import TodoPageUserOtherProfile from "components/todos/TodoPageUserOtherProfile"
import TodoChat from "components/todos/TodoChat"
import TodoNotifications from "components/todos/TodoNotifications"
import TodoBonus from "components/todos/TodoBonus"
import "./pageAbout.scss"

// *■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageAbout() {
	return (
		<div className="AppPage" id="PageAbout">
			<header id="AppPageHeader" className="d-flex">
				<img src={logo} className="App-logo " alt="logo" height={100} />
				<div className="ps-3">
					<h1>A propos de Matcha 4 Geeks</h1>
					<h2>
						Projet <i>Matcha</i> de l'École 42, par dFleury & mabdali
					</h2>
				</div>
			</header>
			<div id="AppPageContent" className="row">
				<div className="z-cadre  row col-12">
					<h3>Description</h3>
					<p>
						Ce project de la branche Web de l'École 42 est une application de rencontres qui vous permet de
						rechercher, de liker et de discuter avec d'autres utilisateurs.
					</p>
				</div>
				<div className="z-cadre  row col-12">
					<h3>Technologies Utilisées</h3>
					<h4>Frontend</h4>
					<ul>
						<li>React.js</li>
						<li>Bootstrap</li>
						<li>Redux</li>
						<li>axios</li>
						<li>react-notifications</li>
					</ul>

					<h4>Backend</h4>
					<ul>
						<li>Express JS</li>
						<li>socket.io</li>
					</ul>

					<h4>Base de données:</h4>
					<ul>
						<li>PostgreSQL</li>
					</ul>

					<h4>Authentification</h4>
					<ul>
						<li>JWT</li>
					</ul>

					<h4>Géolocalisation</h4>
					<ul>
						<li>https://api-adresse.data.gouv.fr</li>
						<li>https://api.ipgeolocation.io</li>
						<li>https://api.ipify.org/</li>
					</ul>
					{/*
					<h4>DDDDDDDDDDDDDDd</h4>
					<ul>
						<li>xxxxxx</li>
						<li>xxxxxx</li>
						<li>xxxxxx</li>
						<li>xxxxxx</li>
						<li>xxxxxx</li>
					</ul>
					*/}
				</div>

				<div className=" row col-12" id="section-sujet">
					<h2>Subject</h2>
					<TodoAuth className="col-xl-4 col-lg-6 col-12" />
					<TodoPageUserMyProfile className="col-xl-4 col-lg-6 col-12" />
					<TodoPageUsersBrowsing className="col-xl-4 col-lg-6 col-12" />
					<TodoPageUsersSearch className="col-xl-4 col-lg-6 col-12" />
					<TodoPageUserOtherProfile className="col-xl-4 col-lg-6 col-12" />
					<TodoChat className="col-xl-4 col-lg-6 col-12" />
					<TodoNotifications className="col-xl-4 col-lg-6 col-12" />
					<TodoBonus className="col-xl-4 col-lg-6 col-12" />
				</div>
			</div>
		</div>
	)
}
