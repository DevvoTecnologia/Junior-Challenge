/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "tsconfig.json",
		tsconfigRootDir: __dirname,
		sourceType: "module",
	},
	plugins: ["import", "@typescript-eslint/eslint-plugin"],
	extends: [
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended"
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: [".eslintrc.*", "jest.config.js", "dist/*"],
	rules: {
		"@typescript-eslint/interface-name-prefix": "off",
		"@typescript-eslint/explicit-function-return-type": "error",
		"@typescript-eslint/explicit-module-boundary-types": "error",
		"@typescript-eslint/prefer-readonly": "error",
		"no-else-return": ["error", { allowElseIf: false }],
		"no-console": "warn",
		"@typescript-eslint/naming-convention": [
			"error",
			{
				selector: "class",
				format: ["PascalCase"],
			},
		],
		"@typescript-eslint/consistent-type-imports": "error",
		"@typescript-eslint/consistent-type-exports": "error",
		"@typescript-eslint/explicit-member-accessibility": [
			"error",
			{
				accessibility: "explicit",
				overrides: {
					accessors: "explicit",
					constructors: "no-public",
					methods: "no-public",
					properties: "explicit",
					parameterProperties: "explicit",
				},
			},
		],
		"@typescript-eslint/no-unnecessary-condition": "error",

		"import/default": "off",
		"import/export": "error",
		"import/first": "warn",
		"import/namespace": ["error", { allowComputed: true }],
		"import/no-duplicates": "error",
		"import/order": [
			"warn",
			{
				groups: [["builtin", "external"], "internal", ["parent", "index", "sibling"]],
				"newlines-between": "always",
				alphabetize: {
					order: "asc",
				},
			},
		],
	},
};