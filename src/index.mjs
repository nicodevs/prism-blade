import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-php';
import addBladeLanguage from './addBladeLanguage';

addBladeLanguage(Prism);

export default Prism.languages.blade;
