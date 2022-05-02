# 🦄 Cursor.js

> ### Customize mouse cursor completely with JS, powered by GSAP.

[![npm-version](https://badgen.net/npm/v/gsap-cursor?cache=600)](https://www.npmjs.com/package/gsap-cursor)
[![total-download](https://badgen.net/npm/dt/gsap-cursor?cache=600)](https://www.npmjs.com/package/gsap-cursor)
[![Made in Vietnam](https://raw.githubusercontent.com/webuild-community/badge/master/svg/made.svg)](https://webuild.community)
[![jsdelivr](https://data.jsdelivr.com/v1/package/gh/phucbm/Cursor.js/badge?style=rounded)](https://www.jsdelivr.com/package/gh/phucbm/Cursor.js)
[![license](https://badgen.net/github/license/phucbm/Cursor.js/)](https://github.com/phucbm/Cursor.js/blob/main/LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/9d9b7120-8c9d-486d-b53e-7fa938ce5c78/deploy-status)](https://app.netlify.com/sites/cursorjs/deploys)

Key features:

- Customize native cursor with JS.
- Update cursor style when hover on specific elements.

Demo 👉 https://cursorjs.netlify.app

![Screen Recording 2022-01-23 at 20 44 49](https://user-images.githubusercontent.com/14942380/150682675-cda01eca-f8d9-4faf-9cd3-611a9ca550e2.gif)

## Installation

### From NPM

```shell
npm i gsap-cursor
```

```js
import {Cursor} from "gsap-cursor";

new Cursor();
```

### UMD version

```html
<!-- GreenSock -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>

<!-- Cursor.js -->
<script src="https://cdn.jsdelivr.net/gh/phucbm/cursor.js/src/cursor.min.js"></script>
```

## Usage

Custom style

```js
const config = {
    speed: .2, // the smaller the slower
    className: '', // custom class for the cursor
    style: {
        width: '15px',
        height: '15px',
        borderRadius: '50%',
        backgroundColor: `rgba(0, 0, 0, .5)`
    }
};
const cursor = new Cursor(config);
```

Custom style on hover

```js
const config = {
    speed: .2, // the smaller the slower
    className: '', // custom class for the cursor
    style: {
        width: '15px',
        height: '15px',
        borderRadius: '50%',
        backgroundColor: `rgba(0, 0, 0, .5)`
    },
    hover: [
        // text
        {
            selector: 'p',
            in: {
                borderRadius: 0,
                width: '2px',
                height: '30px',
                backgroundColor: 'rgba(0,0,0,.3)'
            }
        },
        // clickable elements
        {
            selector: 'a, button',
            magnetic: true,
            in: data => {
                gsap.to(data.cursor, {
                    width: data.hoverTarget.offsetWidth + 6,
                    height: data.hoverTarget.offsetHeight + 4,
                    borderRadius: '4px',
                    backgroundColor: 'rgba(0,0,0,.05)'
                });
            }
        }
    ]
};
const cursor = new Cursor(config);
```

## Deployment

### Development

```shell
npm install
```

```shell
npm run dev
```

### Production build

```shell
npm run build
```

## License

[MIT License](https://github.com/phucbm/Cursor.js/blob/main/LICENSE)

Copyright (c) 2022 Minh-Phuc Bui
