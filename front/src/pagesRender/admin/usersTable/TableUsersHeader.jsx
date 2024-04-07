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
 *	// @updatedby	lamine

 **■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

import React from "react"
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function TableUsersHeader({ filters, setFilters }) {
	function TableUserTh({ txt, ptyName }) {
		return (
			<th
				scope="col"
				className={ptyName ? "isSortable" : ""}
				onClick={() => {
					if (!ptyName) return
					const tempOrderReverse = filters.orderBy === ptyName ? !filters.orderReverse : false
					setFilters({ ...filters, orderBy: ptyName, orderReverse: tempOrderReverse })
				}}
			>
				{ptyName &&
					filters.orderBy === ptyName &&
					(filters.orderReverse ? (
						<FaSortAmountUp className="text-primary" />
					) : (
						<FaSortAmountDown className="text-danger" />
					))}{" "}
				{txt}
			</th>
		)
	}

	return (
		<tr>
			<TableUserTh txt="#" ptyName="id" />
			<TableUserTh txt="Quick Log" ptyName={null} />
			{!filters.minimalVersion && <TableUserTh txt="picture_1" ptyName="picture_1" />}
			<TableUserTh txt="username" ptyName="username" />

			<TableUserTh txt="firstname" ptyName="firstname" />
			<TableUserTh txt="lastname" ptyName="lastname" />

			{!filters.minimalVersion && (
				<>
					<TableUserTh txt="email" ptyName="email" />
					<TableUserTh txt="age, birthday" ptyName="birthday" />
					<TableUserTh txt="biography" ptyName="biography" />
				</>
			)}

			<TableUserTh txt="city, coords" ptyName="city" />
			<TableUserTh txt="gender" ptyName="gender" />
			<TableUserTh txt="sex pref" ptyName={null} />
			<TableUserTh txt="last connection at" ptyName="last_connection_at" />

			{!filters.minimalVersion && (
				<>
					<TableUserTh txt="🌟fame" ptyName="fame" />
					<TableUserTh txt="stat" ptyName={null} />
					<TableUserTh txt="token email" ptyName="email_token" />
					<TableUserTh txt="token password reset" ptyName="password_reset_token" />
					<TableUserTh txt="tags" ptyName={null} />
				</>
			)}
			{/*
			<TableUserTh txt="count liked" ptyName="count_liked" />
			<TableUserTh txt="count visited" ptyName="count_visited" />
			<TableUserTh txt="count blocked" ptyName="count_blocked" />
			<TableUserTh txt="count faked" ptyName="count_faked" />
			*/}
		</tr>
	)
}
