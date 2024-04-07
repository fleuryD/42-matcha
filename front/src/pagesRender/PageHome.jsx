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
 *	@compomentName		PageHome
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
 *	@updatedby	lamine
 *
 *
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"
//import logo from "../assets/logo.png"
import "./pageHome.scss"
import Carousel from "react-bootstrap/Carousel"

// *■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function PageHome() {
	return (
		<div className="AppPage">
			<header id="AppPageHeader">
				<Carousel>
					<Carousel.Item>
						<img src="couple1.jpg" className="d-block w-100 header-carousel" alt="..." />
						{/* <Carousel.Caption>
						<h3>First slide label</h3>
						<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
						</Carousel.Caption> */}
					</Carousel.Item>
					<Carousel.Item>
						<img src="couple2.jpg" className="d-block w-100 header-carousel" alt="..." />
						{/* <Carousel.Caption>
						<h3>Second slide label</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</Carousel.Caption> */}
					</Carousel.Item>
					<Carousel.Item>
						<img src="couple3.jpg" className="d-block w-100 header-carousel" alt="..." />
						{/* <Carousel.Caption>
						<h3>Third slide label</h3>
						<p>
							Praesent commodo cursus magna, vel scelerisque nisl consectetur.
						</p>
						</Carousel.Caption> */}
					</Carousel.Item>
				</Carousel>
			</header>
			<div id="AppPageContent" className="row">
				<section className="available merriweather py-5">
					<div className="container">
						<div className="row">
							<div className="mb-3 border-0 rounded-0">
								<div className="row">
									<div className="col-md-6">
										<img src="speed_dating.jpg" className="img-fluid" alt="..." />
									</div>
									<div className="col-md-6">
										<div className="card-body px-0">
											<h1 className="card-title">Les speed dating</h1>
											<p className="card-text fs-5">
												Découvrez le speed dating sur notre site de rencontre : des rencontres
												rapides, des opportunités instantanées. Rencontrez des célibataires en
												un éclair, trouvez des connexions authentiques en un clin d'œil. L'amour
												est à portée de clic !
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="my-5 border-0 rounded-0">
								<div className="row">
									<div className="col-md-6">
										<div className="card-body px-0">
											<h1 className="card-title">Nos clients nous recommande</h1>
											<p className="card-text fs-5">
												En tant que site de rencontre, notre approche centrée sur les besoins
												individuels et notre interface conviviale sont plébiscitées par nos
												utilisateurs. Grâce à nos fonctionnalités innovantes, nous facilitons
												les rencontres significatives et durables. Rejoignez-nous dès
												aujourd'hui pour découvrir pourquoi nous sommes le choix numéro un de
												ceux qui recherchent l'amour.
											</p>
										</div>
									</div>
									<div className="col-md-6">
										<img src="mariage.png" className="img-fluid" alt="..." />
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}
