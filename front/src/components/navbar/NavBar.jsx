// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Link } from "react-router-dom"
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "store/store"
import { authLogoutSuccess, authToggleModeDev } from "store/authSlice"
import logo from "../../assets/logo.png"
import { Button } from "react-bootstrap"
import { UserPicture } from "components/userComponents"
import {
	IcoAdmin,
	IcoUsersBrowsing,
	IcoGenderM,
	IcoGenderF,
	IcoGenderNB,
	IcoFame,
	IcoNotification,
	IcoQuestion,
	IcoRegister,
	IcoLogin,
	IcoLogout,
	IcoExclamation,
	IcoKey,
} from "components/ui/zIcones"
import { APP_MODE } from "utils/constants"

import "./navBar.scss"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function NavBar({ setShowFormSuperPassword }) {
	const dispatch = useAppDispatch()
	const auth = useAppSelector((state) => state.auth)
	const navigate = useNavigate()

	function btLogoutClick() {
		dispatch(authLogoutSuccess())
		navigate("/")
	}

	/*
	function NavBarDropdownConnectedUser() {
		return (
			<NavDropdown title={<>{auth.username}</>} id="basic-nav-dropdown-connected-user" className=" text-light">
				<NavDropdown.Item as={Link} to={"/users/" + auth.id}>
					<FaAddressCard /> Mon profil
				</NavDropdown.Item>
				<NavDropdown.Item as={Link} to={"/users/" + auth.id + "/edit"}>
					<FaAddressCard /> Editer mon profil
				</NavDropdown.Item>

				<NavDropdown.Divider />

				<NavDropdown.Item onClick={() => btLogoutClick()}>
					<FaSignOutAlt /> Déconnexion ("with just one click" !!!!)
				</NavDropdown.Item>
			</NavDropdown>
		)
	}
	*/

	function NavBarDropdownAbout() {
		return (
			<NavDropdown
				title={
					<>
						<IcoQuestion />
						<span className="d-none d-lg-inline"> A Propos</span>
					</>
				}
				id="basic-nav-dropdown-dev"
				className="ms-4 me-4"
			>
				<NavDropdown.Item as={Link} to="/about">
					<IcoQuestion /> About / Todo
				</NavDropdown.Item>
				<NavDropdown.Item as={Link} to="/CGU">
					<IcoExclamation /> CGU
				</NavDropdown.Item>
			</NavDropdown>
		)
	}

	function NavBarDropdownAdmin() {
		if (APP_MODE !== "DEV") return null

		return (
			<NavDropdown
				title={
					<>
						<IcoAdmin />
						<span className="d-none d-lg-inline"> Admin</span>
					</>
				}
				id="basic-nav-dropdown-dev"
				className="ms-4 me-4"
			>
				<NavDropdown.Item onClick={() => setShowFormSuperPassword(true)}>
					<IcoAdmin /> {auth.superPassword ? "Modifier/Supprimer" : "Définir"} le Super Password
				</NavDropdown.Item>

				{auth.superPassword?.length > 0 && (
					<>
						<NavDropdown.Item as={Link} to="/admin">
							<IcoAdmin /> Admin : Fixtures + QuickLog
						</NavDropdown.Item>

						<NavDropdown.Item onClick={() => dispatch(authToggleModeDev())}>
							<IcoAdmin /> Mode Dev: {auth.modeDev ? "OUI" : "NON"}
						</NavDropdown.Item>
					</>
				)}
			</NavDropdown>
		)
	}

	function NavBarConnectedUserInfos() {
		return (
			<>
				<div className="ms-auto text-end">
					<Nav.Link
						as={Link}
						to={"/users/" + auth.id}
						className="ms-auto text-light"
						title="Voir mon profil."
					>
						{auth.notifications?.length > 0 && (
							<span className="badge-notification">
								<IcoNotification /> {auth.notifications?.length}
							</span>
						)}
						<span className="gender-badge" style={{ fontSize: "1.5em" }}>
							{auth.gender === "M" ? (
								<IcoGenderM />
							) : auth.gendergender === "F" ? (
								<IcoGenderF />
							) : (
								<IcoGenderNB />
							)}
						</span>{" "}
						{auth.username}
						{auth.city && <small> ({auth.city})</small>}
					</Nav.Link>

					<div>
						Tu aimes les {auth.loveM && <IcoGenderM />}
						{auth.loveF && <IcoGenderF />}
						{auth.loveNB && <IcoGenderNB />}
					</div>
				</div>
				{auth.picture_1 && (
					<div id="xNavbarAvatar" className="ms-3 me-3">
						<UserPicture filename={auth.picture_1} alt="" width={75} />
					</div>
				)}
				<div className="">
					<div>
						<IcoFame /> {auth.fame}
					</div>
					<Button className="btn-sm" variant="dark" onClick={() => btLogoutClick()} title="Déconnexion">
						<IcoLogout />
					</Button>
				</div>
			</>
		)
	}

	return (
		<Navbar id="AppNavbar" expand="sm" bg="dark" data-bs-theme="dark" className="text-light">
			<Navbar.Brand as={Link} to="/" id="xNavbarBrand">
				<img src={logo} className="App-logo" alt="logo" width={60} />
				<span className="d-none d-lg-inline">Matcha 4 Geeks</span>
			</Navbar.Brand>

			{auth.isConnected ? (
				<Nav.Link as={Link} to="/users/explorer" className="ms-4 me-4">
					<IcoUsersBrowsing />
					<span className="d-none d-lg-inline"> Explorer</span>
				</Nav.Link>
			) : (
				<>
					<Nav.Link as={Link} to="/auth/login" className="ms-4 me-4">
						<IcoLogin /> <span className="d-none d-lg-inline"> Connexion</span>
					</Nav.Link>

					<Nav.Link as={Link} to="/auth/register" className="ms-4 me-4">
						<IcoRegister /> <span className="d-none d-lg-inline"> Inscription</span>
					</Nav.Link>

					<Nav.Link as={Link} to="/auth/password/reset/ask" className="ms-4 me-4">
						<IcoKey /> <span className="d-none d-lg-inline"> Mot de passe oublié</span>
					</Nav.Link>
				</>
			)}

			<NavBarDropdownAbout />
			<NavBarDropdownAdmin />

			{auth.isConnected && <NavBarConnectedUserInfos />}
		</Navbar>
	)
}
