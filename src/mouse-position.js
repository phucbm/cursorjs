import {getMagneticPosition} from "./helpers";

export function watchMousePosition(context){
    const pos = {x: window.innerWidth / 2, y: window.innerHeight / 2};
    setMousePosition(context, pos.x, pos.y);

    const newSet = (x, y) => {
        context.cursor.style.transform = `translate(${x}px,${y}px)`;
    }

    const loop = () => {
        //if(context.isMagnetic){
        //         const magPos = getMagneticPosition(context, context.hoverTarget);
        //
        //         pos.x = magPos.x;
        //         pos.y = magPos.y;
        //     }

        const dt = 0.2;

        pos.x += (context.mouse.x - pos.x) * dt;
        pos.y += (context.mouse.y - pos.y) * dt;

        newSet(pos.x, pos.y);

        requestAnimationFrame(loop);
    }
    loop();
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