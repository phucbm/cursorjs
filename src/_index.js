import {uniqueId} from './utils'
import {assignEventListeners, assignHoverEvents, setMousePosition, watchMousePosition} from './mouse-position'

class Cursor{
    constructor(options){
        // config
        this.config = {
            ...{
                id: uniqueId('css-cursor-'),
                dev: true,
                speed: 1,
                className: '',
                hover: [],
                attraction: .2, // 1 is weak, 0 is strong
                distance: 100, // magnetic area around element count from center [px]
                onChange: data => {
                },
            }, ...options,
        }

        // classes
        this._class = {
            isHover: 'is-hover',
            hoverEnabled: 'css-cursor-hover-enabled'
        };

        // data
        this.id = this.config.id;
        this.mouse = {x: 0, y: 0};

        this.createCursor();
        watchMousePosition(this);
        assignEventListeners(this);
    }


    /**
     * Create cursor dev and append to body
     */
    createCursor(){
        // create new cursor with id
        const html = `<div id="${this.id}" class="css-cursor ${this.config.className}">
                    <div class="css-cursor-inner"></div>
                  </div>`;

        // insert HTML
        document.body.insertAdjacentHTML('beforeend', html);

        // assign cursor
        this.cursor = document.querySelector(`#${this.id}`);

        // default CSS
        Object.assign(this.cursor.style, {
            pointerEvents: 'none',
            zIndex: '9999',
            position: 'fixed',
            top: 0,
            left: 0,
        });

        if(this.config.dev) console.log(`cursor created #${this.id}`)
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
        this.cursor.remove();

        // remove instance
        window.CSSCursorController.remove(this.id);

        if(this.config.dev) console.log(`cursor #${this.id} removed`)
    }

    refresh(){
        // assign new hover selectors
        assignHoverEvents(this);
    }


    /**
     * Cursor actions
     */
    onCursorEnterViewport(e){
        if(this.config.dev) console.log('doc in')

        // update class
        this.cursor.classList.add('in-viewport');
    }

    onCursorLeaveViewport(e){
        if(this.config.dev) console.log('doc out')

        // update class
        this.cursor.classList.remove('in-viewport');
    }

    onCursorMoving(e){
        setMousePosition(this, e.x, e.y);
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
 * access via window.CSSCursorController
 */
window.CSSCursorController = new Controller();


/**
 * Public library object
 * access via window.CSSCursor
 */
window.CSSCursor = {
    // init new instances
    create: (options = {}) => window.CSSCursorController.add(new Cursor(options)),

    // Get instance object by ID
    get: id => window.CSSCursorController.get(id)
};