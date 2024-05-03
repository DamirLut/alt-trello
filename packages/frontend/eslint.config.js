import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tsEslint from 'typescript-eslint';

import rootConfig from '../../eslint.config.js';

export default tsEslint.config(...rootConfig, {
  plugins: {
    ['jsx-a11y']: jsxA11yPlugin,
    ['react-hooks']: reactHooksPlugin,
    ['react']: reactPlugin,
  },
});
