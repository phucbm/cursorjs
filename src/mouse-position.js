import {getMagneticPosition} from "./helpers";

export function watchMousePosition(context){
    const pos = {x: window.innerWidth, y: window.innerHeight};
    setMousePosition(context, pos.x, pos.y);


    const loop = () => {
        //if(context.isMagnetic){
        //         const magPos = getMagneticPosition(context, context.hoverTarget);
        //
        //         pos.x = magPos.x;
        //         pos.y = magPos.y;
        //     }

        pos.x += (context.mouse.x - pos.x) * context.config.speed;
        pos.y += (context.mouse.y - pos.y) * context.config.speed;

        // set CSS
        context.cursor.style.transform = `translate(${pos.x}px,${pos.y}px)`;

        // rAF
        requestAnimationFrame(loop);
    }
    loop();
}


export function setMousePosition(context, x, y){
    context.mouse.x = x;
    context.mouse.y = y;

    // fire event: onUpdate
    if(typeof context.config.onUpdate === 'function'){
        context.config.onUpdate({mouse: context.mouse});
    }
}


export function assignEventListeners(context){
    assignMouseEvents(context);
    assignHoverEvents(context);
}


function assignMouseEvents(context){
    // leave viewport
    document.addEventListener("mouseout", e => {
        if(context.config.dev) console.log('doc out')

        // update class
        context.cursor.classList.remove('in-viewport');
    });

    // enter viewport
    document.addEventListener("mouseover", e => {
        if(context.config.dev) console.log('doc in')

        // update class
        context.cursor.classList.add('in-viewport');
    });

    // moving
    window.addEventListener("mousemove", e => {
        setMousePosition(context, e.x, e.y);
    });
}

export function assignHoverEvents(context){
    // hover events
    for(const hover of context.config.hover){
        document.querySelectorAll(hover.selectors + `:not(${context._class.hoverEnabled})`).forEach(el => {
            // flag
            el.classList.add(context._class.hoverEnabled);

            // disable cursor
            el.style.cursor = 'none';

            // mouse enter
            el.addEventListener("mouseenter", e => {
                // update class
                context.cursor.classList.add(hover.className);
                context.cursor.classList.add(context._class.isHover);
            });

            // mouse out
            el.addEventListener("mouseleave", e => {
                // update class
                context.cursor.classList.remove(hover.className);
                context.cursor.classList.remove(context._class.isHover);
            });
        });
    }
}