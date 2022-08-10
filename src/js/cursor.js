/**!
 * Cursor.js 1.0.0 (with GSAP)
 * https://github.com/phucbm/Cursor.js
 * MIT License
 * Copyright (c) 2022 Minh-Phuc Bui
 */


import gsap from "gsap";

export class Cursor{
    constructor(options){
        // config
        this.config = {
            ...{
                dev: false, speed: 1, className: '', style: {}, hover: [],
                bounds: document,
                attraction: .2, // 1 is weak, 0 is strong
                distance: 100, // magnetic area around element count from center [px]
                onChange: data => {
                }
            }, ...options
        };

        // data
        this.mouse = {x: 0, y: 0};
        this.status = {
            in: false, hover: [], lastHover: ''
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
        this.positionUpdate();
        this.eventListener();

        return {
            setMousePosition: (x, y) => this.setMousePosition(x, y),
            update: config => this.update(config),
            cursor: this.cursor
        };
    }


    /**
     * Create cursor dev and append to body
     */
    createCursor(){
        // create new cursor with id
        const id = this.uniqueId('cursor-');
        const el = document.createElement('div');
        el.setAttribute("id", id);
        el.setAttribute("class", `custom-cursor ${this.config.className}`);
        el.setAttribute("style", `width:0;height:0;transform:translate(0,0);`);

        // assign cursor
        document.body.appendChild(el);
        this.cursor = document.querySelector(`#${id}`);

        // styling
        this.setCursorOut();

        if(this.config.dev) console.log(`cursor created #${id}`);
    }

    update(config){
        this.config = {...this.config, ...config};
        this.style.default = {...this.style.default, ...this.config.style};
        this.setCursorDefault();
    }

    setMousePosition(x, y){
        this.mouse.x = x;
        this.mouse.y = y;

        if(typeof this.config.onChange === 'function'){
            this.config.onChange({mouse: this.mouse});
        }
    }

    positionUpdate(){
        const pos = {x: window.innerWidth / 2, y: window.innerHeight / 2};
        this.setMousePosition(pos.x, pos.y);

        const xSet = gsap.quickSetter(this.cursor, "x", "px");
        const ySet = gsap.quickSetter(this.cursor, "y", "px");

        gsap.ticker.add(() => {
            if(this.isMagnetic){
                const magPos = this.getMagneticPosition(this.hoverTarget);

                pos.x = magPos.x;
                pos.y = magPos.y;
            }else{
                const dt = 1.0 - Math.pow(1.0 - this.config.speed, gsap.ticker.deltaRatio());

                pos.x += (this.mouse.x - pos.x) * dt;
                pos.y += (this.mouse.y - pos.y) * dt;
            }

            // set position
            xSet(pos.x);
            ySet(pos.y);
        });
    }

    eventListener(){
        const bounds = this.config.bounds;

        bounds.addEventListener("mouseleave", e => {
            this.cursorOut(e);
        });
        bounds.addEventListener("mouseenter", e => {
            this.cursorIn(e);
        });
        bounds.addEventListener("mousemove", e => {
            this.cursorMoving(e);
        });

        // hover events
        for(const hover of this.config.hover){
            document.querySelectorAll(hover.selector).forEach(el => {
                el.style.cursor = 'none';

                // mouse enter
                el.addEventListener("mouseenter", e => {
                    if(this.config.dev) console.log(`hover in [${hover.selector}]`);

                    this.status.lastHover = this.status.hover[this.status.hover.length - 1] || hover.selector;
                    this.status.hover.push(hover.selector);
                    this.setCursorHover(e);
                });

                // mouse out
                el.addEventListener("mouseleave", e => {
                    if(this.config.dev) console.log(`hover out [${hover.selector}]`);

                    this.status.hover = this.status.hover.filter(item => item !== hover.selector);
                    this.setCursorHover(e);
                });
            });
        }
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
        this.setMousePosition(e.x, e.y);

        // force in when movement detected
        if(!this.isEnterStyleDrawn() && !this.status.hover.length){
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
            const hover = this.getHover(hoverSelector);
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
                const hover = this.getHover(this.status.lastHover);

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


    /**
     * Helpers
     */

    isEnterStyleDrawn(){
        return this.cursor.style.width === this.style.default.width && this.cursor.style.height === this.style.default.height;
    }

    getHover(selector){
        for(const hover of this.config.hover){
            if(hover.selector === selector){
                return hover;
            }
        }
        return false;
    }

    /**
     * Generate unique ID
     */
    uniqueId(prefix = ''){
        return prefix + (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16);
    }

    /**
     * Get element offsets
     * https://github.com/jquery/jquery/blob/d0ce00cdfa680f1f0c38460bc51ea14079ae8b07/src/offset.js#L87
     * @param element : HTMLElement
     * @returns {{top: *, left: *}|{top: number, left: number}}
     */
    getOffset(element = this.cursor){
        if(!element.getClientRects().length){
            return {top: 0, left: 0};
        }

        const rect = element.getBoundingClientRect();
        const win = element.ownerDocument.defaultView;
        return {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset
        };
    }

    distanceFromMouseToEl(el, mouseX = this.mouse.x, mouseY = this.mouse.y){
        let centerX = this.getOffset(el).left + el.offsetWidth / 2,
            centerY = this.getOffset(el).top + el.offsetHeight / 2,
            pointX = mouseX - centerX,
            pointY = mouseY - centerY,
            distance = Math.sqrt(Math.pow(pointX, 2) + Math.pow(pointY, 2));
        return Math.floor(distance);
    }

    getMagneticPosition(el){
        if(typeof el === 'undefined') return this.mouse;

        const centerX = this.getOffset(el).left + el.offsetWidth / 2,
            centerY = this.getOffset(el).top + el.offsetHeight / 2,
            x = Math.floor(centerX - this.mouse.x) * -1 * this.config.attraction,
            y = Math.floor(centerY - this.mouse.y) * -1 * this.config.attraction,
            mouseDistance = this.distanceFromMouseToEl(el);

        if(mouseDistance < this.config.distance){
            return {x: x + centerX, y: y + centerY};
        }
        return this.mouse;
    }
}