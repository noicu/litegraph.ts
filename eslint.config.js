// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      // eslint ignore globs here
    ],
    "plugins": ["jest"],
  },
  {
    rules: {
      "no-console": "off",
      "no-empty": "warn",
      "no-redeclare": "warn",
      "no-inner-declarations": "warn",
      "no-constant-condition": "warn",
      "no-unused-vars": "warn",
      "no-mixed-spaces-and-tabs": "warn",
      "no-unreachable": "warn",
      "curly": ["warn", "all"]
    },
  },
)
