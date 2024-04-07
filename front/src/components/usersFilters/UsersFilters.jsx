// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"
import { Button, Form } from "react-bootstrap"
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa"
import { FiRefreshCcw } from "react-icons/fi"
import "./usersFilters.scss"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function UsersFilters({ filters, setFilters, resetFilters, modeAdmin = false }) {
	function BtOrder({ text, ptyName }) {
		return (
			<Button
				className="badge me-1"
				variant={filters.orderBy === ptyName ? "primary" : "secondary"}
				onClick={() => {
					if (!ptyName) return
					const tempOrderReverse = filters.orderBy === ptyName ? !filters.orderReverse : false
					setFilters({ ...filters, orderBy: ptyName, orderReverse: tempOrderReverse })
				}}
			>
				{ptyName &&
					filters.orderBy === ptyName &&
					(filters.orderReverse ? (
						<FaSortAmountUp className="text-light" />
					) : (
						<FaSortAmountDown className="text-danger" />
					))}{" "}
				{text}
			</Button>
		)
	}

	return (
		<div className="col-12 bg-light" /* style={{backgroundColor: 'red'}} */ id="usersExplorerFilters">
			<Form.Group controlId="fame" className="formGroup  ">
				<Form.Label className="">
					<b>Fame</b> min:
				</Form.Label>
				<Form.Control
					type="number"
					value={filters.fameMin === null ? "" : filters.fameMin}
					onChange={(e) => {
						setFilters({ ...filters, fameMin: e.target.value })
					}}
					step={10}
				/>
				&nbsp;
				<Form.Label className="">max:</Form.Label>
				<Form.Control
					type="number"
					value={filters.fameMax === null ? "" : filters.fameMax}
					onChange={(e) => {
						setFilters({ ...filters, fameMax: e.target.value })
					}}
					step={10}
				/>
			</Form.Group>

			<Form.Group controlId="age" className="formGroup ">
				<Form.Label className="">
					<b>Âge</b> min:
				</Form.Label>
				<Form.Control
					type="number"
					value={filters.ageMin === null ? "" : filters.ageMin}
					onChange={(e) => {
						setFilters({ ...filters, ageMin: e.target.value })
					}}
					step={1}
					min={18}
				/>
				&nbsp;
				<Form.Label className="">max:</Form.Label>
				<Form.Control
					type="number"
					value={filters.ageMax === null ? "" : filters.ageMax}
					onChange={(e) => {
						setFilters({ ...filters, ageMax: e.target.value })
					}}
					step={1}
					min={18}
				/>
			</Form.Group>

			{!modeAdmin && (
				<>
					<Form.Group controlId="distancesMax" className="formGroup">
						<Form.Label className="">Distance max (km): </Form.Label>
						<Form.Control
							type="number"
							value={filters.distanceMax === null ? "" : filters.distanceMax}
							onChange={(e) => {
								setFilters({ ...filters, distanceMax: e.target.value })
							}}
							step={100}
							min={0}
						/>
					</Form.Group>

					<Form.Group controlId="tags" className="formGroup">
						<Form.Label className="">Centres d'intérêt commun:</Form.Label>
						<Form.Control
							type="number"
							value={filters.commonTagsCount === null ? "" : filters.commonTagsCount}
							onChange={(e) => {
								setFilters({ ...filters, commonTagsCount: e.target.value })
							}}
							step={1}
							min={0}
						/>
					</Form.Group>

					<Form.Check
						className="formGroup"
						type="switch"
						id="includeBlocked-switch"
						label=" Bloqués"
						checked={filters.includeBlocked}
						onChange={() => {
							setFilters({ ...filters, includeBlocked: !filters.includeBlocked })
						}}
					/>
				</>
			)}

			<Button
				className="btn-sm btn-secondary me-1"
				onClick={() => {
					resetFilters()
				}}
			>
				<FiRefreshCcw />
			</Button>

			{!modeAdmin && (
				<Form.Group controlId="order" className="formGroup">
					<Form.Label className="">Trier par:</Form.Label>
					<BtOrder text="Pseudo" ptyName="username" />
					<BtOrder text="Age" ptyName="birthday" />
					<BtOrder text="Fame" ptyName="fame" />
					<BtOrder text="Distance" ptyName="distance" />
					<BtOrder text="centres d'intérêt en commun" ptyName="common_tags_count" />
				</Form.Group>
			)}
			{modeAdmin && (
				<Form.Check
					className="formGroup"
					type="switch"
					id="minimalVersion-switch"
					label=" minimalVersion"
					checked={filters.minimalVersion}
					onChange={() => {
						setFilters({ ...filters, minimalVersion: !filters.minimalVersion })
					}}
				/>
			)}
		</div>
	)
}
