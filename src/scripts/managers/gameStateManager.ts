import { componentsManager } from "../../../submodules/glass/dist/main.js";
import { containerType } from "../../../submodules/glass/dist/types/componentCreationTypes.js";

export const gameStateManager = (() => {
    
    let playerElement: containerType;

    function initialize(): void {

        playerElement = componentsManager.getComponentById("playerContainer") as containerType; //! todo: fix types
    }
    
    function getPlayerElement(): containerType {

        return playerElement;
    }

    return {

        initialize,
        getPlayerElement
    }
})();