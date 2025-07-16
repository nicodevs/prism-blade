# Prism Blade

Blade Language syntax highlighting for Prism.

- [GitHub](https://github.com/nicodevs/prism-blade)
- [NPM](https://www.npmjs.com/package/prism-blade)

---

### Installation

```sh
npm i prism-blade
```

### Alternative: CDN

```html
<!-- Get Prism from the CDN -->
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>

<!-- Make sure to include the following language definitions -->
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-php.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-javascript.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-css.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-markup-templating.min.js"></script>

<!-- Then include the script from the CDN -->
<script src="https://cdn.jsdelivr.net/npm/prism-blade@latest/dist/prism-blade.min.js"></script>
```

---

### Usage

```js
import Prism from 'prismjs';
import 'prism-blade';

const code = `@include('header')`;
const html = Prism.highlight(code, Prism.languages.blade, 'blade');
```

---

### Preview

#### Interpolation

![Interpolation](docs/images/interpolation.png)

#### Interpolations in attribute values

![Interpolations in attribute values](docs/images/interpolation-attributes.png)

#### Unscaped interpolation

![Unscaped interpolation](docs/images/interpolation-unscaped.png)

#### Comments

![Comments](docs/images/comments.png)

#### Directives

![Directives](docs/images/directives.png)

#### Components

![Components](docs/images/components.png)

#### Scripts and style blocks

![Scripts and style blocks](docs/images/scripts-styles.png)

#### @php directive

![@php directives](docs/images/directive-php.png)

#### @verbatim directive

![@verbatim directives](docs/images/directive-verbatim.png)
