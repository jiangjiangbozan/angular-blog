const angularPlugin = require('@angular-eslint/eslint-plugin');
const angularTemplatePlugin = require('@angular-eslint/eslint-plugin-template');
const typescriptParser = require('@typescript-eslint/parser');
const eslintConfigPrettier = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');
const htmlPlugin = require('eslint-plugin-html'); // 新增

module.exports = [
  // Angular TypeScript 配置（保持不变）
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@angular-eslint': angularPlugin,
    },
    processor: angularTemplatePlugin.processors['extract-inline-html'],
    rules: {
      ...angularPlugin.configs.recommended.rules,
    },
  },
  // Angular 模板配置（处理组件内联模板）
  {
    files: ['**/*.html'],
    ignores: ['src/index.html'], // 暂时排除 index.html
    languageOptions: {
      parser: require('@angular-eslint/template-parser'),
    },
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin,
    },
    rules: {
      ...angularTemplatePlugin.configs.recommended.rules,
    },
  },
  // 普通 HTML 文件配置（新增）
  {
    files: ['src/index.html'], // 单独处理 index.html
    plugins: {
      html: htmlPlugin,
    },
    languageOptions: {
      parser: htmlPlugin.parser || require('espree'),
    },
    rules: {},
  },
  // Prettier 配置
  {
    files: ['**/*.{js,ts,html}'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...eslintConfigPrettier.rules,
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
];
