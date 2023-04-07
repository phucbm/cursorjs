export function watchMousePosition(context){
    const pos = {x: window.innerWidth, y: window.innerHeight};

    // default cursor position
    setMousePosition(context, pos.x, pos.y);

    const loop = () => {
        // skip update if cursor is not display
        if(getComputedStyle(context.cursorWrapper).display !== 'none'){
            // lerp (https://codepen.io/rachsmith/post/animation-tip-lerp)
            pos.x += (context.mouse.x - pos.x) * context.config.speed;
            pos.y += (context.mouse.y - pos.y) * context.config.speed;

            // set CSS
            context.cursorWrapper.style.transform = `translate(${pos.x}px,${pos.y}px)`;
        }

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
        context.cursorWrapper.classList.remove(context._class.inViewport);

        // hide inner cursor
        context.cursorInner.style.opacity = '0';
    });

    // enter viewport
    document.addEventListener("mouseover", e => {
        if(context.config.dev) console.log('doc in')

        // update class
        context.cursorWrapper.classList.add(context._class.inViewport);

        // hide inner cursor
        context.cursorInner.style.opacity = '1';
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

            // update cursor
            el.style.cursor = hover.cursor ? hover.cursor : 'none';

            // class name
            const className = context.config.hoverPrefixClass + hover.className;

            // mouse enter
            el.addEventListener("mouseenter", e => {
                // update class
                context.cursorWrapper.classList.add(className);
                context.cursorWrapper.classList.add(context._class.isHover);
            });

            // mouse out
            el.addEventListener("mouseleave", e => {
                // update class
                context.cursorWrapper.classList.remove(className);
                context.cursorWrapper.classList.remove(context._class.isHover);
            });
        });
    }
}