import {getMagneticPosition} from "./helpers";
import {debounce} from "@/utils";

export function watchMousePosition(context) {
  const pos = {x: window.innerWidth / 2, y: window.innerHeight / 2};
  setMousePosition(context, pos.x, pos.y);

  const xSet = gsap.quickSetter(context.cursor, "x", "px");
  const ySet = gsap.quickSetter(context.cursor, "y", "px");

  gsap.ticker.add(() => {
    if (context.isMagnetic) {
      const magPos = getMagneticPosition(context, context.hoverTarget);

      pos.x = magPos.x;
      pos.y = magPos.y;
    } else {
      const dt = 1.0 - Math.pow(1.0 - context.config.speed, gsap.ticker.deltaRatio());

      pos.x += (context.mouse.x - pos.x) * dt;
      pos.y += (context.mouse.y - pos.y) * dt;
    }

    // set position
    xSet(pos.x);
    ySet(pos.y);
  });
}


export function setMousePosition(context, x, y) {
  context.mouse.x = x;
  context.mouse.y = y;

  // fire event: onChange
  if (typeof context.config.onChange === 'function') {
    context.config.onChange({mouse: context.mouse});
  }
}


export function assignEventListeners(context) {
  // leave viewport
  document.addEventListener("mouseleave", e => {
    context.onCursorLeaveViewport(e);
  });

  // enter viewport
  document.addEventListener("mouseenter", e => {
    context.onCursorEnterViewport(e);
  });

  // moving
  window.addEventListener("mousemove", e => {
    context.onCursorMoving(e);
  });


  // hover events
  for (const hover of context.config.hover) {
    document.querySelectorAll(hover.selectors).forEach(el => {
      el.style.cursor = 'none';

      // mouse enter
      el.addEventListener("mouseenter", e => {
        // update class
        context.cursor.classList.add(hover.className);
      });

      // mouse out
      el.addEventListener("mouseleave", e => {
        // update class
        context.cursor.classList.remove(hover.className);
      });
    });
  }
}
