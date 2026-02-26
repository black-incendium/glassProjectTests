import { glass } from "../../submodules/glass/dist/main.js";
import { assetsConfig } from './configs/assetsConfig.js';
import { gameConfig } from './configs/gameConfig.js';
import { layoutConfig } from './configs/layoutConfig.js';
import { eventsManager } from "../../submodules/glass/dist/main.js";
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

function startMainFlow() {

    console.log(1)
}