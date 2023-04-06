import {distanceFromMouseToEl, getOffset} from "./utils";

export function getMagneticPosition(context, el){
    if(typeof el === 'undefined') return context.mouse;

    const centerX = getOffset(el).left + el.offsetWidth / 2,
        centerY = getOffset(el).top + el.offsetHeight / 2,
        x = Math.floor(centerX - context.mouse.x) * -1 * context.config.attraction,
        y = Math.floor(centerY - context.mouse.y) * -1 * context.config.attraction,
        mouseDistance = distanceFromMouseToEl(el, context.mouse.x, context.mouse.y);

    if(mouseDistance < context.config.distance){
        return {x: x + centerX, y: y + centerY};
    }
    return context.mouse;
}


export function getHover(selector, hoverItems){
    for(const hover of hoverItems){
        if(hover.selector === selector){
            return hover;
        }
    }
    return false;
}

export function isEnterStyleDrawn(context){
    return context.cursor.style.width === context.style.default.width && context.cursor.style.height === context.style.default.height;
}


/**
 * Create cursor dev and append to body
 */
export function createCursor(context){
    // create new cursor with id
    const html = `<div id="${context.id}" class="${context._class.wrapper} ${context.config.className}">
                    <div class="${context._class.inner}">${context.config.innerHTML}</div>
                  </div>`;

    // insert HTML
    context.config.container.insertAdjacentHTML('beforeend', html);

    // assign cursor
    context.cursor = document.querySelector(`#${context.id}`);

    // default CSS
    Object.assign(context.cursor.style, {
        pointerEvents: 'none',
        zIndex: '9999',
        position: 'fixed',
        top: 0,
        left: 0,
    });

    if(context.config.dev) console.log(`cursor created #${context.id}`)
}