// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import React from "react"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export default function DevAuthInfos() {
	return (
		<div className="row col-12">
			<div className="col-6 bg-danger  text-light d-block d-sm-none">Visible only on xs</div>
			<div className="col-6 bg-warning            d-none d-sm-block d-md-none">Visible only on sm</div>
			<div className="col-6 bg-info               d-none d-md-block d-lg-none">Visible only on md</div>
			<div className="col-6 bg-primary text-light d-none d-lg-block d-xl-none">Visible only on lg</div>
			<div className="col-6 bg-success            d-none  d-xl-block d-xxl-none">Visible only on xl</div>
			<div className="col-6 bg-warning            d-none  d-xxl-block">Visible only on xxl</div>

			<div className="col-6 bg-secondary          d-lg-none">hide on screens WIDER than lg</div>
			<div className="col-6 bg-secondary text-light d-none d-lg-block">hide on screens SMALLER than lg</div>
		</div>
	)
}
