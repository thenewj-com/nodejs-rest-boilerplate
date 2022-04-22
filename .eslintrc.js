module.exports = {
	env: {
		node: true,
		commonjs: true,
		es2022: true,
	},
	extends: `eslint:recommended`,
	parserOptions: {
		ecmaVersion: `latest`,
	},
	rules: {
		indent: [`error`, `tab`],
		"linebreak-style": [`error`, `unix`],
		quotes: [`error`, `backtick`, { avoidEscape: true }],
		semi: [`error`, `always`],
		"comma-dangle": [`error`, `always-multiline`],
	},
};
