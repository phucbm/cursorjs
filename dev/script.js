// public styles
import '@viivue/atomic-css';
import 'honcau';

// private style
import './style.scss';

// source script
import '@/_index';
import {Cursor} from "@/_index";

// import package info
const packageInfo = require('../package.json');

/**
 * Update HTML
 */
// update title
const title = `${packageInfo.prettyName} v${packageInfo.version}`;
document.title = `${title} - ${packageInfo.description}`;
document.querySelector('[data-title]').innerHTML = title;
document.querySelector('[data-description]').innerHTML = packageInfo.description;

/**
 * Lib usage
 */
CSSCursor.init({
    id: 'my-cursor',
    speed: .2,
    hover: [
        {
            selectors: '.cursor-grid-demo article',
            className: 'style-grid'
        },
        {
            selectors: '.cursor-image',
            className: 'style-image'
        },
    ]
});
