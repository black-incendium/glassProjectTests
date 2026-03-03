import { coordinatesType, inputManager, mathUtils, progressorsManager } from "../../../submodules/glass/dist/main.js";
import { progressorType } from "../../../submodules/glass/dist/managers/progressorsManager.js";
import { containerType } from "../../../submodules/glass/dist/types/componentCreationTypes.js";
import { moveActionManagerConfig } from "../configs/moveActionManagerConfig.js";
import { gameStateManager } from "./gameStateManager.js";
import { playerActionsManager } from "./playerActionsManager.js";

export const moveActionManager = (() => {
    
    let config = moveActionManagerConfig;

    let startPosition: coordinatesType;
    let targetPosition: coordinatesType;
    
    let isMovementInProgress: boolean;

    let playerElement: containerType;

    let movementProgressor: progressorType;

    function initialize():  void {

        config = moveActionManagerConfig;
        
        isMovementInProgress = false;

        playerElement = gameStateManager.getPlayerElement();

        movementProgressor = progressorsManager.getNewProgressor({
            startValue: 0,
            targetValue: config.stepLength,
            duration: config.stepLength/config.speed,
            updateCallback: movementProgressorUpdateCallback,
            finishCallback: movementProgressorFinishCallback,
        });
    }

    function isActionPossible(): boolean {

        if (isMovementInProgress === true) return false;

        return true;
    }

    function performAction(destinationVector: coordinatesType): void {

        if (isMovementInProgress === true) return;

        isMovementInProgress = true;

        startPosition = {x: playerElement.x, y: playerElement.y};
        targetPosition = {
            x: playerElement.x + (config.stepLength * destinationVector.x), 
            y: playerElement.y + (config.stepLength * destinationVector.y)
        };

        movementProgressor.start();
    }

    function movementProgressorUpdateCallback(currentValue: number): void {

        const position = mathUtils.getPointByRatioBetweenTwoPoints(startPosition, targetPosition, currentValue/movementProgressor.targetValue);

        playerElement.x = position.x;
        playerElement.y = position.y;
    }

    function movementProgressorFinishCallback(): void {

        isMovementInProgress = false;
        playerActionsManager.actionFinished();
    }

    return {

        initialize,
        isActionPossible,
        performAction
    }
})();