/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential', '@vue/eslint-config-typescript/recommended', '@vue/eslint-config-prettier'],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    // '@typescript-eslint/naming-convention': 'warn',
    // curly: 'warn',
    // eqeqeq: 'warn',
    // 'no-throw-literal': 'warn',
  },
  overrides: [
    {
      files: ['*.vue', "*.ts"],
      rules: {
        'no-undef': 'off'
      }
    }, {
      files: ['scripts/*.js'],
      env: {
        'node': true
      }
    }
  ],
  env: {
    'vue/setup-compiler-macros': true
  },
  ignorePatterns: ['dist', '*.html', '.eslintrc.cjs', 'src/components/uni-*/*', 'src/lib/*', "postcss.config.js"]
}
