module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: `eslint:recommended`,
	parserOptions: {
		ecmaVersion: 12,
	},
	rules: {
		indent: [`error`, `tab`],
		"linebreak-style": [`error`, `unix`],
		quotes: [`error`, `backtick`, { avoidEscape: true }],
		semi: [`error`, `always`],
	},
};
