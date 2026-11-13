// Konfigurasi ESLint bersama untuk semua paket TypeScript dan React.
import js from '@eslint/js'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export function buatKonfigurasi({ react = false } = {}) {
  return tseslint.config(
    { ignores: ['dist/**', 'coverage/**', 'src/schema.d.ts'] },
    js.configs.recommended,
    ...tseslint.configs.strict,
    {
      languageOptions: {
        globals: { ...globals.browser, ...globals.node },
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        // Mencegah data pribadi bocor ke konsol (dokumen 10 bagian 3).
        'no-console': ['error', { allow: ['warn', 'error'] }],
      },
    },
    ...(react
      ? [
          jsxA11y.flatConfigs.strict,
          {
            plugins: { 'react-hooks': reactHooks },
            rules: reactHooks.configs.recommended.rules,
          },
        ]
      : []),
  )
}
