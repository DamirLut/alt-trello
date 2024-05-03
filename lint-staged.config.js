export default {
  './**/*.{ts,tsx}': [
    (files) => {
      return `bunx prettier --write ${files.join(' ')}`;
    },
    (files) => `bunx eslint ${files.join(' ')}`,
  ],
};
