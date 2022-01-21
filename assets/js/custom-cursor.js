class CustomCursor{
    constructor(options){
        this.status = {
            in: false,
            hover: ''
        };
        this.config = {
            ...{
                dev: false,
                speed: 0.35,
                className: '',
                bodyCursor: false,
                style: {},
                hover: []
            }, ...options
        };

        this.style = {
            default: {
                ...{
                    duration: .3,
                    xPercent: -50,
                    yPercent: -50,
                    pointerEvents: 'none',
                    zIndex: '9999',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '40px',
                    height: '40px',
                    border: '2px solid rgba(0,0,0,.5)',
                    borderRadius: '50px'
                }, ...this.config.style
            },
            out: {
                opacity: 0,
                duration: .3
            },
            in: {
                opacity: 1,
                duration: .3
            },
        };


        this.createCursor();
        this.positionUpdate();
        this.eventListener();


        if(!this.config.bodyCursor){
            document.body.style.cursor = 'none';
        }
    }


    createCursor(){
        // create new cursor with id
        const id = this.uniqueId('cursor-');
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

    positionUpdate(){
        // special thanks to Blake Bowen for this code https://codepen.io/GreenSock/pen/WNNNBpo
        const pos = {x: window.innerWidth / 2, y: window.innerHeight / 2};
        this.mouse = {x: pos.x, y: pos.y};

        const xSet = gsap.quickSetter(this.cursor, "x", "px");
        const ySet = gsap.quickSetter(this.cursor, "y", "px");

        gsap.ticker.add(() => {
            // adjust speed for higher refresh monitors
            const dt = 1.0 - Math.pow(1.0 - this.config.speed, gsap.ticker.deltaRatio());

            pos.x += (this.mouse.x - pos.x) * dt;
            pos.y += (this.mouse.y - pos.y) * dt;
            xSet(pos.x);
            ySet(pos.y);
        });
    }

    eventListener(){
        document.addEventListener("mouseleave", e => {
            this.cursorOut(e);
        });

        document.addEventListener("mouseenter", e => {
            this.cursorIn(e);
        });
        window.addEventListener("mousemove", e => {
            this.cursorMoving(e);
        });

        // hover events
        for(const hover of this.config.hover){
            // mouse enter
            document.querySelector(hover.selector).addEventListener("mouseenter", e => {
                if(this.config.dev) console.log(`hover in [${hover.selector}]`);
                if(typeof hover.in === 'function'){
                    this.status.hover = hover.selector;
                    hover.in(this.cursor);
                }
            });

            // mouse out
            document.querySelector(hover.selector).addEventListener("mouseleave", e => {
                if(this.config.dev) console.log(`hover out [${hover.selector}]`);
                this.status.hover = '';
                this.cursorIn(e);

                if(typeof hover.out === 'function'){
                    hover.out(this.cursor);
                }
            });
        }
    }

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
        this.mouse.x = e.x;
        this.mouse.y = e.y;

        // force in when movement detected
        if(!this.isEnterStyleDrawn() && !this.status.hover.length){
            this.cursorIn(e);
        }
    }

    setCursorIn(){
        if(this.config.dev) console.log('gsap in');
        gsap.to(this.cursor, this.style.in);
    }

    setCursorOut(){
        if(this.config.dev) console.log('gsap out');
        gsap.to(this.cursor, this.style.out);
    }

    setCursorDefault(){
        if(this.config.dev) console.log('gsap default');
        gsap.set(this.cursor, this.style.default);
    }

    isEnterStyleDrawn(){
        return this.cursor.style.width === this.style.default.width && this.cursor.style.height === this.style.default.height;
    }

    /**
     * Generate unique ID
     */
    uniqueId(prefix = ''){
        return prefix + (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16);
    }
}