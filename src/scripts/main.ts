import { glass } from "../../submodules/glass/dist/main.js";
import { assetsConfig } from './configs/assetsConfig.js';
import { gameConfig } from './configs/gameConfig.js';
import { layoutConfig } from './configs/layoutConfig.js';
import { eventsManager } from "../../submodules/glass/dist/main.js";
import { componentsManager } from "../../submodules/glass/dist/main.js";
import { rendererEventsData } from "../../submodules/glass/dist/main.js";

const canvas = document.querySelector('canvas');
const gl = canvas?.getContext('webgl2', {stencil: true}) ?? null;

if (canvas !== null && gl !== null) {

    eventsManager.addEventListener(rendererEventsData.renderingStarted.name,  () => {

        startMainFlow();

    }, {oneTime: true});

    glass.initialize({
        canvas,
        gl,
        assetsData: assetsConfig,
        gameData: gameConfig,
        layoutData: layoutConfig
    });
}

function startMainFlow(): void {

    for (let i = 0; i < 100; i++) {
        const newSquare = componentsManager.createNewComponent({
            id: `newSquare${i}`,
            type: 'basicGraphics',
            r: Math.random(),
            g: Math.random(),
            b: Math.random(),
            a: Math.random(),
            width: Math.random()*300,
            height: Math.random()*300,
            x: Math.random()*(gameConfig.width - 300),
            y: Math.random()*(gameConfig.height - 300)
        });

        componentsManager.getComponentById('randomSquaresContainer')!.addChild(newSquare!);
    }
}