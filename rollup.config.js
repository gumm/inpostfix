// rollup.config.js

export default [
  {
    input: 'module/rpn.mjs',
    output: {
      file: 'main.js',
      format: 'cjs',
      name: 'rpn',
    }
  }
];