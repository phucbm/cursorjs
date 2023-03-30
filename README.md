# GSAP mouse cursor

A boilerplate to develop JavaScript library with:

- UMD version
- NPM package
- Multiple dev servers

> CSS file will not be included in production build.

## Examples

- Production
  site: https://gsap-cursor.netlify.app [![Netlify Status](https://api.netlify.com/api/v1/badges/3dcd8303-517a-4297-b027-98b9adcc7c5c/deploy-status)](https://app.netlify.com/sites/gsap-cursor/deploys)
- Dev
  site: https://gsap-cursor-dev.netlify.app [![Netlify Status](https://api.netlify.com/api/v1/badges/9d0e745c-a957-4c34-923f-d74852270174/deploy-status)](https://app.netlify.com/sites/gsap-cursor-dev/deploys)
- Distribution files: [/dist](https://github.com/phucbm/webpack-library-boilerplate/tree/main/dist)

## Todos

1. Update `package.json`
    - `name`: output file name
    - `prettyName`: output library name
    - ...
2. Library script start with `src/_index.js`, **do not rename this file**.
3. Edit dev site in folder `dev`
4. Edit production site in folder `web`

## Deployment

### Dev server

Run production server

```shell
npm run web
```

Run dev server

```shell
npm run dev
```

You can add more dev site by duplicate dev or web folder and update the npm scripts.

### Generate production files

Generate UMD and module version

```shell
npm run prod
```

Generate UMD and module version then publish NPM package

```shell
npm run publish
```

### Build sites

Build production site

```shell
npm run build
```

Build dev site

```shell
npm run build-dev
```
