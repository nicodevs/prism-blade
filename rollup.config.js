import terser from '@rollup/plugin-terser';

export default [
  // IIFE for CDN
  {
    input: 'src/index.cdn.js',
    output: {
      file: 'dist/prism-blade.min.js',
      format: 'iife',
      name: 'PrismBlade'
    },
    plugins: [terser()]
  },
  // CommonJS
  {
    input: 'src/index.cjs',
    output: {
      file: 'dist/prism-blade.cjs',
      format: 'cjs'
    }
  },
  // ESM
  {
    input: 'src/index.mjs',
    output: {
      file: 'dist/prism-blade.js',
      format: 'esm'
    }
  }
];
