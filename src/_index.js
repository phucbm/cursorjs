import {uniqueId} from './utils'
import {assignEventListeners, assignHoverEvents, watchMousePosition} from './mouse-position'
import {createCursor} from "./helpers";

class Cursor{
    constructor(options){
        // config
        this.config = {
            dev: false, // show console log

            id: uniqueId('css-cursor-'),
            speed: .2, // cursor easing speed, the smaller, the slower

            container: document.body, // where to append cursor HTML
            className: '',
            innerHTML: '',
            classInViewport: '',

            // default style
            wrapperCSS: {},
            cursorCSS: {},

            // add class to cursor when hovering on specific items
            hoverPrefixClass: '',
            hover: [],
            // selectors: '.item', // items to detect cursor hover
            // className: 'is-item-hover' // class added on hover
            // cursor: 'none' // native cursor style on hover

            // on cursor position update
            onUpdate: data => {
            },

            ...options,
        }

        if(!this.config.container){
            console.warn('Container is not defined!', this.config.container);
            return;
        }

        // default styles
        this._style = {
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
            },
        };
        this.config.wrapperCSS = {...this._style.wrapperCSS, ...this.config.wrapperCSS};
        this.config.cursorCSS = {...this._style.cursorCSS, ...this.config.cursorCSS};

        // classes
        this._class = {
            wrapper: 'css-cursor',
            inner: 'css-cursor-inner',
            isHover: 'is-hover',
            hoverEnabled: 'css-cursor-hover-enabled',
            inViewport: this.config.classInViewport || 'in-viewport'
        };

        // data
        this.id = this.config.id;
        this.mouse = {x: 0, y: 0};
        this.cursorWrapper = undefined;
        this.cursorInner = undefined;

        createCursor(this);
        watchMousePosition(this);
        assignEventListeners(this);
    }


    /**
     * Method: update()
     * @param config
     */
    update(config){
        this.config = {...this.config, ...config}
    }

    destroy(){
        // remove from DOM
        this.cursorWrapper.remove();

        // remove instance
        window.CursorjsController.remove(this.id);

        if(this.config.dev) console.log(`cursor #${this.id} removed`)
    }

    refresh(){
        // assign new hover selectors
        assignHoverEvents(this);
    }
}


/**
 * Private class Controller
 * This class will hold instances of the library's objects
 */
class Controller{
    constructor(){
        this.instances = [];
    }

    remove(id){
        this.instances = this.instances.filter(x => x.id !== id);
    }

    add(instance){
        this.instances.push(instance);
    }

    get(id){
        return this.instances.filter(instance => instance.id === id)[0];
    }
}


/**
 * Public library data
 * access via window.CursorjsController
 */
window.CursorjsController = new Controller();


/**
 * Public library object
 * access via window.Cursorjs
 */
window.Cursorjs = {
    // init new instances
    create: (options = {}) => window.CursorjsController.add(new Cursor(options)),

    // Get instance object by ID
    get: id => window.CursorjsController.get(id)
};