const Prism = require('prismjs');
require('prismjs/components/prism-markup.js');
require('prismjs/components/prism-markup-templating.js');
require('prismjs/components/prism-javascript.js');
require('prismjs/components/prism-css.js');
require('prismjs/components/prism-php.js');

const addBladeLanguage = require('./addBladeLanguage.js');

addBladeLanguage(Prism);

module.exports = Prism.languages.blade;
