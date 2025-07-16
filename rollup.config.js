export default [
  // IIFE for CDN
  {
    input: 'src/languages/prism-blade.js',
    output: {
      file: 'dist/prism-blade.min.js',
      format: 'iife',
      name: 'PrismBlade'
    }
  },
  // CommonJS
  {
    input: 'src/languages/prism-blade.js',
    output: {
      file: 'dist/prism-blade.cjs',
      format: 'cjs'
    }
  },
  // ESM
  {
    input: 'src/languages/prism-blade.js',
    output: {
      file: 'dist/prism-blade.js',
      format: 'esm',
      banner: `import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-php';`
    }
  }
];
