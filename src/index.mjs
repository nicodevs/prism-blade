import Prism from 'prismjs';
import 'prismjs/components/prism-markup.js';
import 'prismjs/components/prism-markup-templating.js';
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-css.js';
import 'prismjs/components/prism-php.js';
import addBladeLanguage from './addBladeLanguage.js';

addBladeLanguage(Prism);

export default Prism.languages.blade;
