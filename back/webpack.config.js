const path = require("path")

module.exports = {
	mode: "production",
	//entry: "./index.js",
	entry: "./src/app.js",
	output: {
		path: path.join(__dirname, "dist"),
		publicPath: "/",
		filename: "final.js",
	},
	//externals: [nodeExternals()],
	//externals: ["nock", "mock-aws-s3", "aws-sdk"],
	//module: {
	//	rules: [{ test: /\.html$/, use: "raw-loader" }],
	//},
	target: "node",
}
