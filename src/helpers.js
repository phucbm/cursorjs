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