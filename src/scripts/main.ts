import { eventType, glass, inputManager, inputManagerEventsData } from "../../submodules/glass/dist/main.js";
import { assetsConfig } from './configs/assetsConfig.js';
import { appConfig } from './configs/appConfig.js';
import { layoutConfig } from './configs/layoutConfig.js';
import { eventsManager } from "../../submodules/glass/dist/main.js";
import { componentsManager } from "../../submodules/glass/dist/main.js";
import { assetsManager } from "../../submodules/glass/dist/main.js";
import { rendererEventsData } from "../../submodules/glass/dist/main.js";
import { playerActionsManager } from "./managers/playerActionsManager.js";
import { gameStateManager } from "./managers/gameStateManager.js";

const canvas = document.querySelector('canvas');
const gl = canvas?.getContext('webgl2', {stencil: true, antialias: false}) ?? null;

if (canvas !== null && gl !== null) {

    eventsManager.addEventListener(rendererEventsData.renderingStarted.name,  () => {

        startMainFlow();

    }, {oneTime: true});

    glass.initialize({
        canvas,
        gl,
        assetsData: assetsConfig,
        appData: appConfig,
        layoutData: layoutConfig
    });
}

function startMainFlow(): void {

    let continueLoop = true;
    let i = 0;
    const elementsInRowNumber = 6;
    const elementSize = 160

    while (continueLoop === true) {

        if (assetsManager.getAssetDataByName(`basicTile${i}`) !== null) {

            const row = Math.floor(i/elementsInRowNumber);
            const column = i % elementsInRowNumber;

            const newSprite = componentsManager.createNewComponent({
                id: `basicTile${i}Sprite`,
                type: 'sprite',
                assets: [`basicTile${i}`],
                x: column * elementSize,
                y: row * elementSize,
                scale: 10,
            });

            componentsManager.getComponentById('basicTilesContainer')?.addChild(newSprite!);
        } else {

            continueLoop = false;
        }

        i++;
    }

    gameStateManager.initialize();

    playerActionsManager.initialize();
    playerActionsManager.setIsWaitingForAction(true);
}