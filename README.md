# Prism Blade

Blade Language syntax highlighting for Prism.

- [GitHub](https://github.com/nicodevs/prism-blade)
- [NPM](https://www.npmjs.com/package/prism-blade)

### Installation

```bash
npm i prism-blade
```

### Usage

```js
import Prism from 'prismjs';
import 'prism-blade';

const code = `@include('header')`;
const html = Prism.highlight(code, Prism.languages.blade, 'blade');
```

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
