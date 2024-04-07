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
 *		Affiché sur le profil d'un utilisateur (connecté ou autre)
 *		Contient les 5 photos (si definie)
 *		Si c'est mon profil, je peux ajouter/modifier des photos
 *
 *
 *	@usedIn
 *		- `pagesRnder/profil/PageRenderMyProfil`
 *		- `pagesRnder/profil/PageRenderOtherUserProfil`
 *
 *
 *
 *	@author		dfleury
 *
 *
 *
 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React, { useState } from "react"
import { useAppSelector } from "store/store"
import { Button } from "react-bootstrap"
import { UserPicture } from "components/userComponents"
import { IcoEdit, IcoPlus } from "components/ui/zIcones"
import ProfilPicturesForm from "./ProfilPicturesForm"

// *■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

function PictureContainer({ filename, setImageNumber, itsMe, containerClassName }) {
	return (
		<div className={containerClassName}>
			{!filename && itsMe && (
				<Button onClick={setImageNumber} variant={"primary"} className="btn-sm">
					<IcoPlus />
				</Button>
			)}

			{filename && (
				<>
					<UserPicture filename={filename} className="profil-img-user img-fluid" alt="." />
					{itsMe && (
						<Button onClick={setImageNumber} variant={"warning"} className="btn-sm">
							<IcoEdit />
						</Button>
					)}
				</>
			)}
		</div>
	)
}

/*
 *	`PageUserProfil` redirects to this page or `PageUserProfilOther`
 *
 */
export default function ProfilPictures({ user }) {
	const [imageNumber, setImageNumber] = useState(0)
	const auth = useAppSelector((state) => state.auth)
	return (
		<div className="row col-12 pb-3">
			{imageNumber > 0 && <ProfilPicturesForm closeForm={() => setImageNumber(0)} imageNumber={imageNumber} />}
			<PictureContainer
				filename={user.picture_1}
				itsMe={auth.id === user.id}
				setImageNumber={() => setImageNumber(1)}
				containerClassName="col-12"
			/>
			<div className="row col-12">
				<PictureContainer
					filename={user.picture_2}
					itsMe={auth.id === user.id}
					setImageNumber={() => setImageNumber(2)}
					containerClassName="col-3 border border-light p-1"
				/>
				<PictureContainer
					filename={user.picture_3}
					itsMe={auth.id === user.id}
					setImageNumber={() => setImageNumber(3)}
					containerClassName="col-3 border border-light p-1"
				/>
				<PictureContainer
					filename={user.picture_4}
					itsMe={auth.id === user.id}
					setImageNumber={() => setImageNumber(4)}
					containerClassName="col-3 border border-light p-1"
				/>
				<PictureContainer
					filename={user.picture_5}
					itsMe={auth.id === user.id}
					setImageNumber={() => setImageNumber(5)}
					containerClassName="col-3 border border-light p-1"
				/>
			</div>
		</div>
	)
	// *************************************************************************
}
