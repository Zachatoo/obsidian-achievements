module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	env: { node: true },
	plugins: ["@typescript-eslint", "svelte3"],
	overrides: [
		{
			files: ["*.svelte"],
			processor: "svelte3/svelte3",
		},
	],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
	],
	parserOptions: {
		sourceType: "module",
	},
	rules: {
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
		"@typescript-eslint/ban-ts-comment": "off",
		"no-prototype-builtins": "off",
		"@typescript-eslint/no-empty-function": "off",
	},
	settings: {
		"svelte3/typescript": () => require("typescript"), // pass the TypeScript package to the Svelte plugin
	},
};
