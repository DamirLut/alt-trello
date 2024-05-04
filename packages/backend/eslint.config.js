import tsEslint from 'typescript-eslint';

import rootConfig from '../../eslint.config.js';

export default tsEslint.config(...rootConfig, {
  ignores: ['migrations'],
});
