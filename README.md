# 🦄 Cursor.js

> Create custom mouse cursor with pure vanilla JS (4kb) and CSS (optional) with no dependency.

[![npm version](https://badgen.net/npm/v/@phucbm/cursorjs?icon=npm)](https://www.npmjs.com/package/@phucbm/cursorjs)
[![npm downloads](https://badgen.net/npm/dm/@phucbm/cursorjs?icon=npm)](https://www.npmjs.com/package/@phucbm/cursorjs)
[![npm dependents](https://badgen.net/npm/dependents/@phucbm/cursorjs?icon=npm)](https://www.npmjs.com/package/@phucbm/cursorjs)
[![github stars](https://badgen.net/github/stars/phucbm/cursorjs?icon=github)](https://github.com/phucbm/cursorjs/)
[![jsdelivr hits](https://badgen.net/jsdelivr/hits/gh/phucbm/cursorjs?icon=jsdelivr)](https://www.jsdelivr.com/package/gh/phucbm/cursorjs)
[![jsdelivr npm rank](https://badgen.net/jsdelivr/rank/npm/@phucbm/cursorjs?icon=npm)](https://www.npmjs.com/package/@phucbm/cursorjs)
[![github license](https://badgen.net/github/license/phucbm/cursorjs?icon=github)](https://github.com/phucbm/cursorjs/blob/main/LICENSE)
[![Made in Vietnam](https://raw.githubusercontent.com/webuild-community/badge/master/svg/made.svg)](https://webuild.community)
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

## Docs

### Cursor options

| Name             | Type        | Default                   | Description                                                      |
|------------------|-------------|---------------------------|------------------------------------------------------------------|
| id               | string      | `"css-cursor-<uniqueID>"` | Set ID to get instance                                           |
| speed            | float       | `0.2`                     | Cursor easing speed, the smaller, the slower                     |
| container        | DOM element | `document.body`           | Where to append cursor HTML                                      |
| className        | string      | `""`                      | Class for cursor                                                 |
| innerHTML        | string      | `""`                      | Inner HTML for cursor                                            |
| classInViewport  | string      | `""`                      | Class when cursor is in viewport                                 |
| matchMedia       | string      | `"(hover:hover)"`         | Only init if match this media                                    |
| hoverPrefixClass | string      | `""`                      | Prefix for hover class.                                          |
| hover            | string      | `[]`                      | Actions when hover on specific elements. See Hover object below. |
| wrapperCSS       | CSS object  | `{...}`                   | Default style for cursor wrapper (*)                             |
| cursorCSS        | CSS object  | `{...}`                   | Default style for cursor (*)                                     |

(*) default CSS

```js
const options = {
    wrapperCSS: {
        pointerEvents: 'none',
        zIndex: '9999',
        position: 'fixed',
        top: 0,
        left: 0,
    },
    cursorCSS: {
        boxShadow: '0 0 0 2px rgba(0, 0, 0, .3)',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        transition: 'all .3s ease',
        position: 'absolute',
        transform: 'translate(-50%,-50%)'
    }
}
```

### Hover object

| Name      | Type   | Default  | Description                                      |
|-----------|--------|----------|--------------------------------------------------|
| selectors | string | `""`     | CSS selector, multiple elements is supported     |
| className | string | `""`     | Add this class to cursor when hover on selectors |
| cursor    | string | `"none"` | CSS cursor when hover on selectors               |

```js
// sample hover array
const options = {
    hover: [
        {
            selectors: '.item-a, .item-b',
            className: 'is-hover-on-items',
            cursor: 'pointer',
        },
        {
            selectors: '.item-c',
            className: 'is-hover-on-item-c',
            cursor: 'none',
        }
    ]
}
```

## Methods

```js
const cursor = Cursorjs.get('my-cursor');

// remove cursor from DOM
cursor.destroy();

// check new hover selectors, useful when new items are loaded via AJAX
cursor.refresh();
```

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
