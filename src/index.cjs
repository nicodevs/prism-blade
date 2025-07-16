const Prism = require('prismjs');
require('prismjs/components/prism-markup');
require('prismjs/components/prism-markup-templating');
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-css');
require('prismjs/components/prism-php');

const addBladeLanguage = require('./addBladeLanguage.js');

addBladeLanguage(Prism);

module.exports = Prism.languages.blade;
