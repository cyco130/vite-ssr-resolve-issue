// @ts-check
const { resolve } = require("path");

const { createServer } = require("vite");

createServer({
	plugins: [
		{
			name: "fake-greetings-plugin",
			enforce: "pre",
			resolveId(source) {
				if (source === "greetings") {
					return resolve(__dirname, "fake-greetings.mjs");
				}

				return undefined;
			},
		},
	],
}).then(async (server) => {
	await server.listen();
	console.log("Loading problem-module.mjs:");
	await server.ssrLoadModule("./problem-module.mjs");
	console.log(
		"Now please visit http://localhost:3000 and check the dev console to see the result of the same module being loaded on the client.",
	);
});
