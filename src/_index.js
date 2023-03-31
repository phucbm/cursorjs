import {uniqueId} from './utils'
import {getHover, isEnterStyleDrawn} from './helpers'
import {assignEventListeners, setMousePosition, watchMousePosition} from './mouse-position'

export class Cursor {
  constructor(options) {
    // config
    this.config = {
      ...{
        dev: true,
        speed: 1,
        className: '',
        hover: [],
        attraction: .2, // 1 is weak, 0 is strong
        distance: 100, // magnetic area around element count from center [px]
        onChange: data => {
        },
      }, ...options,
    }

    // data
    this.mouse = {x: 0, y: 0}

    this.createCursor()
    watchMousePosition(this)
    assignEventListeners(this)

    return {
      setMousePosition: (x, y) => setMousePosition(this, x, y),
      update: config => this.update(config),
    }
  }


  /**
   * Create cursor dev and append to body
   */
  createCursor() {
    // create new cursor with id
    const id = uniqueId('cursor-');
    const html = `<div id="${id}" class="css-cursor ${this.config.className}">
                    <div class="css-cursor-inner"></div>
                  </div>`;

    // insert HTML
    document.body.insertAdjacentHTML('beforeend', html);

    // assign cursor
    this.cursor = document.querySelector(`#${id}`);

    // default CSS
    Object.assign(this.cursor.style, {
      pointerEvents: 'none',
      zIndex: '9999',
      position: 'fixed',
      top: 0,
      left: 0,
    });

    if (this.config.dev) console.log(`cursor created #${id}`)
  }


  /**
   * Method: update()
   * @param config
   */
  update(config) {
    this.config = {...this.config, ...config}
  }


  /**
   * Cursor actions
   */
  onCursorEnterViewport(e) {
    if (this.config.dev) console.log('doc in')

    // update class
    this.cursor.classList.add('in-viewport');
  }

  onCursorLeaveViewport(e) {
    if (this.config.dev) console.log('doc out')

    // update class
    this.cursor.classList.remove('in-viewport');
  }

  onCursorMoving(e) {
    setMousePosition(this, e.x, e.y);
  }
}
