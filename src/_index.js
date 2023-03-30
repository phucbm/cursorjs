import {uniqueId} from "./utils";
import {getHover, isEnterStyleDrawn} from "./helpers";
import {eventListener, setMousePosition, watchMousePosition} from "./mouse-position";

export class Cursor{
    constructor(options){
        // config
        this.config = {
            ...{
                dev: false,
                speed: 1,
                className: '',
                style: {},
                hover: [],
                attraction: .2, // 1 is weak, 0 is strong
                distance: 100, // magnetic area around element count from center [px]
                onChange: data => {
                }
            }, ...options
        };

        // data
        this.mouse = {x: 0, y: 0};
        this.status = {
            in: false,
            hover: [],
            lastHover: ''
        };
        this.style = {
            default: {
                ...{
                    // fixed settings
                    duration: .3,
                    xPercent: -50,
                    yPercent: -50,
                    pointerEvents: 'none',
                    zIndex: '9999',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    // style
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    backgroundColor: `rgba(0, 0, 0, .5)`
                }, ...this.config.style
            }, out: {
                opacity: 0, duration: .3
            }, in: {
                opacity: 1, duration: .3
            },
        };


        this.createCursor();
        watchMousePosition(this);
        eventListener(this);

        return {
            setMousePosition: (x, y) => setMousePosition(this, x, y),
            update: config => this.update(config)
        };
    }


    /**
     * Create cursor dev and append to body
     */
    createCursor(){
        // create new cursor with id
        const id = uniqueId('cursor-');
        const el = document.createElement('div');
        el.setAttribute("id", id);
        el.setAttribute("class", `custom-cursor ${this.config.className}`);

        // assign cursor
        document.body.appendChild(el);
        this.cursor = document.querySelector(`#${id}`);

        // styling
        this.setCursorOut();

        if(this.config.dev) console.log(`cursor created #${id}`);
    }


    /**
     * Method: update()
     * @param config
     */
    update(config){
        this.config = {...this.config, ...config};
        this.style.default = {...this.style.default, ...this.config.style};
        this.setCursorDefault();
    }


    /**
     * Cursor actions
     */
    cursorIn(e){
        if(this.config.dev) console.log('doc in');
        this.status.in = true;
        this.setCursorDefault();
        this.setCursorIn();
    }

    cursorOut(e){
        if(this.config.dev) console.log('doc out');
        this.status.in = false;
        this.setCursorDefault();
        this.setCursorOut();
    }

    cursorMoving(e){
        setMousePosition(this, e.x, e.y);

        // force in when movement detected
        if(!isEnterStyleDrawn(this) && !this.status.hover.length){
            this.cursorIn(e);
        }
        if(this.status.hover.length && this.hoverTarget){
            this.setCursorHover(this.hoverTarget);
        }
    }


    /**
     * Set cursor style
     * @param e
     */

    setCursorHover(e){
        const hoverSelector = this.status.hover[this.status.hover.length - 1];
        if(typeof hoverSelector !== 'undefined'){
            const hover = getHover(hoverSelector);
            this.hoverTarget = e.target || this.hoverTarget;

            // callback function
            if(typeof hover.in === 'function'){
                hover.in(this);
            }

            // object
            if(typeof hover.in === 'object'){
                this.setCursorStyle(hover.in);
            }

            // magnetic
            this.isMagnetic = typeof hover.magnetic === 'boolean' && hover.magnetic;
        }else{
            if(typeof this.status.lastHover !== 'undefined'){
                const hover = getHover(this.status.lastHover, this.config.hover);

                // callback function
                if(typeof hover.out === 'function'){
                    hover.out(this);
                }

                // object
                if(typeof hover.out === 'object'){
                    this.setCursorStyle(hover.out);
                }
            }
            this.cursorIn(e);
            this.isMagnetic = false;
        }
    }

    setCursorStyle(style){
        gsap.to(this.cursor, {...{duration: .2}, ...style});
    }

    setCursorIn(){
        if(this.config.dev) console.log('gsap in');
        this.setCursorStyle(this.style.in);
    }

    setCursorOut(){
        if(this.config.dev) console.log('gsap out');
        this.setCursorStyle(this.style.out);
    }

    setCursorDefault(){
        if(this.config.dev) console.log('gsap default');
        this.setCursorStyle(this.style.default);
    }
}