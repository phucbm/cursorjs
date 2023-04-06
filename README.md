# 🦄 Cursor.js

> Create custom mouse cursor with pure vanilla JS + CSS

[![npm-version](https://badgen.net/npm/v/%40phucbm%2Fcursorjs?cache=600)](https://www.npmjs.com/package/%40phucbm%2Fcursorjs)
[![total-download](https://badgen.net/npm/dt/%40phucbm%2Fcursorjs?cache=600)](https://www.npmjs.com/package/%40phucbm%2Fcursorjs)
[![Made in Vietnam](https://raw.githubusercontent.com/webuild-community/badge/master/svg/made.svg)](https://webuild.community)
[![jsdelivr](https://data.jsdelivr.com/v1/package/gh/phucbm/cursorjs/badge?style=rounded)](https://www.jsdelivr.com/package/gh/phucbm/cursorjs)
[![license](https://badgen.net/github/license/phucbm/cursorjs/)](https://github.com/phucbm/cursorjs/blob/main/LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/9d9b7120-8c9d-486d-b53e-7fa938ce5c78/deploy-status)](https://app.netlify.com/sites/cursorjs/deploys)

Key features:

- Cursor moving with easing (no dependencies)
- Extremely light-weight (4kb)
- One cursor - unlimited styles on hover

Demo 👉 https://cursorjs.netlify.app

## Getting started

### Installation

#### NPM Package

```shell
npm i @phucbm/cursorjs
```

Import

```js
import "@phucbm/cursorjs";
```

#### Download

👉 Self hosted - [Download the latest release](https://github.com/phucbm/cursorjs/releases/latest)

```html

<script src="./cursorjs.min.js"></script>
```

👉 CDN Hosted - [jsDelivr](https://www.jsdelivr.com/package/gh/phucbm/cursorjs)

```html
<!-- JS (10KB) -->
<script src="https://cdn.jsdelivr.net/gh/phucbm/cursorjs@latest/dist/cursorjs.min.js"></script>
```

### Initialize

```js
// with default style
Cursorjs.create();

// with more options
Cursorjs.create({
    id: 'my-cursor',
    innerHTML: '<i class="icon-cursor"></i>',
    hover: [
        {
            selectors: '.items',
            className: 'my-style-class'
        },
    ]
});
```

## Options

### Selectors

| Name         | Type        | Default               | Description                                |
|--------------|-------------|-----------------------|--------------------------------------------|
| el           | DOM element | `[data-eta]`          | Wrapper element                            |

## Deployment

```shell
# Run dev server
npm run dev

# Generate UMD and module version
npm run prod

# Build production site
npm run build

# Generate UMD and module version then publish NPM package
npm run publish
```

## License

[MIT License](https://github.com/phucbm/cursorjs/blob/main/LICENSE)

Copyright (c) 2023 @phucbm