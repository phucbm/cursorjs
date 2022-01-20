class CustomCursor{
    constructor(options){
        this.config = {
            ...{
                speed: 0.35,
                className: '',
                bodyCursor: false,
                styleEnter: {},
                styleLeave: {}
            }, ...options
        };

        this.style = {
            enter: {
                ...{
                    xPercent: -50,
                    yPercent: -50,
                    pointerEvents: 'none',
                    zIndex: '9999',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    opacity: 1,
                    width: '40px',
                    height: '40px',
                    border: '2px solid rgba(0,0,0,.5)',
                    borderRadius: '50%'
                }, ...this.config.styleEnter
            },
            leave: {
                ...{
                    opacity: 0,
                }, ...this.config.styleLeave
            }
        };

        this.createCursor();
        this.positionUpdate();

        if(!this.config.bodyCursor){
            document.body.style.cursor = 'none';
        }
        let isEnter = false;
        document.addEventListener("mouseleave", e => {
            console.log('mouseleave')
            isEnter = false;
            gsap.to(this.cursor, this.style.leave);
        });

        document.addEventListener("mouseenter", e => {
            console.log('mouseenter')
            isEnter = true;
            gsap.to(this.cursor, this.style.enter);
        });
        window.addEventListener("mousemove", e => {
            gsap.to(this.cursor, this.style.enter);
        });
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
        gsap.set(this.cursor, this.style.enter);
    }

    positionUpdate(){
        // special thanks to Blake Bowen for this code https://codepen.io/GreenSock/pen/WNNNBpo
        const pos = {x: window.innerWidth / 2, y: window.innerHeight / 2};
        this.mouse = {x: pos.x, y: pos.y};

        window.addEventListener("mousemove", e => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });

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

    /**
     * Generate unique ID
     */
    uniqueId(prefix = ''){
        return prefix + (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16);
    }
}