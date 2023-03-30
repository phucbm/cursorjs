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
new Cursor({
    speed: .2,
    style: {
        width: '40px',
        height: '40px',
        backgroundColor: 'rgba(0,0,0,1)',
        boxShadow: '0 0 0 2px rgba(0,0,0,.3)',
        opacity: .2,
    },
    hover: [
        // grid
        {
            selector: '.cursor-grid-demo article',
            //magnetic: true,
            in: data => {
                gsap.to(data.cursor, {
                    scale: 1.05,
                    opacity: .6,
                });
            }
        },

    ]
});