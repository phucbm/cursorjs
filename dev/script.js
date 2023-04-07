// public styles
import '@viivue/atomic-css';
import 'honcau';

// private style
import './style.scss';

// source script
import '@/_index';

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
// outer ring
Cursorjs.create({
    id: 'cursor-ring',
    hover: [
        {
            selectors: '#default-cursor',
            className: 'default'
        },
        {
            selectors: '.cursorjs-grid-demo article',
            className: 'grid'
        },
        {
            selectors: '.cursorjs-image',
            className: 'image'
        },
    ]
});

// inner dot
Cursorjs.create({
    id: 'cursor-dot',
    speed: .3,
    cursorCSS: {
        width: '4px',
        height: '4px',
        background: '#000',
        boxShadow: 'none'
    },

    // hover
    hover: [
        {
            selectors: '#default-cursor',
            className: 'default'
        },
        {
            selectors: '.cursorjs-grid-demo article',
            className: 'grid'
        },
        {
            selectors: '.cursorjs-image',
            className: 'image'
        },
    ]
});
