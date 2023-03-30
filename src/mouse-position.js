import {getMagneticPosition} from "./helpers";

export function watchMousePosition(context){
    const pos = {x: window.innerWidth / 2, y: window.innerHeight / 2};
    setMousePosition(context, pos.x, pos.y);

    const xSet = gsap.quickSetter(context.cursor, "x", "px");
    const ySet = gsap.quickSetter(context.cursor, "y", "px");

    gsap.ticker.add(() => {
        if(context.isMagnetic){
            const magPos = getMagneticPosition(context, context.hoverTarget);

            pos.x = magPos.x;
            pos.y = magPos.y;
        }else{
            const dt = 1.0 - Math.pow(1.0 - context.config.speed, gsap.ticker.deltaRatio());

            pos.x += (context.mouse.x - pos.x) * dt;
            pos.y += (context.mouse.y - pos.y) * dt;
        }

        // set position
        xSet(pos.x);
        ySet(pos.y);
    });
}


export function setMousePosition(context, x, y){
    context.mouse.x = x;
    context.mouse.y = y;

    // fire event: onChange
    if(typeof context.config.onChange === 'function'){
        context.config.onChange({mouse: context.mouse});
    }
}


export function assignEventListeners(context){
    document.addEventListener("mouseleave", e => {
        context.cursorLeaveViewport(e);
    });
    document.addEventListener("mouseenter", e => {
        context.cursorEnterViewport(e);
    });
    window.addEventListener("mousemove", e => {
        context.cursorMoving(e);
    });

    // hover events
    for(const hover of context.config.hover){
        document.querySelectorAll(hover.selector).forEach(el => {
            el.style.cursor = 'none';

            // mouse enter
            el.addEventListener("mouseenter", e => {
                if(context.config.dev) console.log(`hover in [${hover.selector}]`);

                context.status.lastHover = context.status.hover[context.status.hover.length - 1] || hover.selector;
                context.status.hover.push(hover.selector);
                context.setCursorHover(e);
            });

            // mouse out
            el.addEventListener("mouseleave", e => {
                if(context.config.dev) console.log(`hover out [${hover.selector}]`);

                context.status.hover = context.status.hover.filter(item => item !== hover.selector);
                context.setCursorHover(e);
            });
        });
    }
}