# Prism Blade

Blade Language syntax highlighting for Prism.

### Usage

```js
import Prism from 'prismjs';
import 'prism-blade';

const code = `@include('header')`;
const html = Prism.highlight(code, Prism.languages.blade, 'blade');
```
