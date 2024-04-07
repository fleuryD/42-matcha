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
 *	@author		dfleury
 *
 *
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"
import { styled } from "styled-components"

// *■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageCgu() {
	return (
		<div className="AppPage">
			<header id="AppPageHeader">
				<h1>Conditions Générales d'Utilisation de Matcha4Geeks</h1>
			</header>
			<div id="AppPageContent" className="row">
				<div className=" col-12">
					<StyledArticle>
						<h3>1. Acceptation des Conditions</h3>
						<p>
							En accédant et en utilisant le site Matcha4Geeks, vous acceptez les présentes Conditions
							Générales d'Utilisation (CGU). Si vous n'acceptez pas ces conditions, veuillez ne pas
							utiliser notre site.
						</p>
					</StyledArticle>

					<StyledArticle>
						<h3>2. Géolocalisation</h3>
						<p>
							a. Consentement explicite : En utilisant Matcha4Geeks, vous consentez expressément à être
							localisé(e) par notre site. Cette localisation peut être effectuée à l'aide de la
							géolocalisation du navigateur ou de l'adresse IP de votre appareil.
						</p>
						<p>
							b. Géolocalisation par le navigateur : Si vous avez activé la géolocalisation dans les
							paramètres de votre navigateur, nous pourrions utiliser ces informations pour vous fournir
							une expérience plus personnalisée, telle que la recherche de correspondances dans votre
							région.
						</p>
						<p>
							c. Géolocalisation par adresse IP : Si la géolocalisation par le navigateur n'est pas
							activée, nous pouvons utiliser votre adresse IP pour estimer votre emplacement approximatif.
							Veuillez noter que cette méthode peut ne pas être aussi précise que la géolocalisation par
							le navigateur.
						</p>
					</StyledArticle>

					<StyledArticle>
						<h3>3. Protection de la Vie Privée</h3>
						<p>
							a. Confidentialité des Données : Nous nous engageons à protéger votre vie privée. Les
							informations de localisation que nous collectons seront traitées conformément à notre
							Politique de Confidentialité.
						</p>{" "}
						<p>
							b. Options de Contrôle : Vous pouvez contrôler les paramètres de géolocalisation de votre
							navigateur ou désactiver la géolocalisation dans votre compte Matcha4Geeks si vous ne
							souhaitez pas être localisé(e).
						</p>
					</StyledArticle>

					<StyledArticle>
						<h3>4. Utilisation Responsable</h3>
						<p>
							a. Respect des Lois : En utilisant Matcha4Geeks, vous vous engagez à respecter toutes les
							lois et réglementations locales, nationales et internationales applicables.
						</p>
					</StyledArticle>

					<StyledArticle>
						<h3>5. Modifications des CGU</h3>
						<p>
							Nous nous réservons le droit de modifier ces CGU à tout moment. Les modifications prendront
							effet dès leur publication sur le site. Il est de votre responsabilité de consulter
							régulièrement les CGU pour être informé(e) des éventuelles mises à jour.
						</p>
						<br />
						<br />
						<p>Merci de lire attentivement nos CGU.</p>
						<p>
							En continuant d'utiliser Matcha4Geeks, vous acceptez les conditions énoncées dans ce
							document.
						</p>
					</StyledArticle>
				</div>
			</div>
		</div>
	)
}

// 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓	STYLED_COMPONENTS

const StyledArticle = styled.div`
	border-bottom: 1px solid red;
	padding: 5px;
	margin-bottom: 15px;
	h3 {
		//color: blue;
		font-weight: bold;
	}
`
