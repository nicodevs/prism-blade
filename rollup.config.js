export default [
  // IIFE for CDN/browser usage
  {
    input: 'src/languages/prism-blade.js',
    output: {
      file: 'dist/prism-blade.min.js',
      format: 'iife',
      name: 'PrismBlade'
    }
  },
  // CommonJS for Node.js
  {
    input: 'src/languages/prism-blade.js',
    output: {
      file: 'dist/prism-blade.cjs',
      format: 'cjs'
    }
  },
  // ESM for modern bundlers
  {
    input: 'src/languages/prism-blade.js',
    output: {
      file: 'dist/prism-blade.js',
      format: 'esm'
    }
  }
];
