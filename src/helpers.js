import {distanceFromMouseToEl, getOffset} from "./utils";


/**
 * Get magnetic position
 * @param context
 * @param el
 * @returns {{x: *, y: *}|*}
 */
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
    context.cursorWrapper = document.querySelector(`#${context.id}`);
    context.cursorInner = context.cursorWrapper.firstElementChild;

    // wrapper CSS
    Object.assign(context.cursorWrapper.style, context.config.wrapperCSS);

    // cursor inner CSS
    Object.assign(context.cursorInner.style, context.config.cursorCSS);

    if(context.config.dev) console.log(`cursor created #${context.id}`)
}