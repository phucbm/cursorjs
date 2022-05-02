import '@/styles/index.scss'
import {Cursor} from "@/js/cursor";
import dat from "dat.gui/src/dat";
import homeHtml from "@/html/home.html";

const cursor = new Cursor();

// GUI
const config = {
    speed: 1,
    className: 'cursor-inverted',
    style: {
        width: '15px',
        height: '15px',
        backgroundColor: 'rgba(0,0,0,.5)'
    }
};
const guiValue = {
    speed: config.speed,
    bgColor: [0, 0, 0],
    opacity: .5,
    size: 15,
};
const gui = new dat.GUI({name: 'Cursor.js', width: 300, useLocalStorage: true});
const update = () => {
    const color = `rgba(${guiValue.bgColor[0]},${guiValue.bgColor[1]},${guiValue.bgColor[2]},${guiValue.opacity})`;
    cursor.update({
        speed: guiValue.speed,
        style: {
            backgroundColor: color,
            width: `${guiValue.size}px`,
            height: `${guiValue.size}px`
        }
    });
}

gui.add(guiValue, 'speed').step(.01).min(.1).max(1).name('Speed').onChange(update);
gui.add(guiValue, 'size').step(1).min(5).max(100).name('Size [px]').onChange(update);
gui.addColor(guiValue, 'bgColor').name('Color').onChange(update);
gui.add(guiValue, 'opacity').step(.05).min(.05).max(1).name('Opacity').onChange(update);


const app = document.querySelector('#root')
app.innerHTML = homeHtml;