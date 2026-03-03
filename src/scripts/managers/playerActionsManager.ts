import { eventsManager, eventType, inputManager, inputManagerEventsData } from "../../../submodules/glass/dist/main.js";
import { moveActionManager } from "./moveActionManager.js";

export const playerActionsManager = (() => {
    
    let isWaitingForAction: boolean;

    function initialize(): void {

        isWaitingForAction = false;

        eventsManager.addEventListener(inputManagerEventsData.keyPressed.name, (event: eventType, eventData: {keyCode: string}) => {

            if (isWaitingForAction === false) return;

            handlePressedKeys();
        });

        moveActionManager.initialize();
    }

    function setIsWaitingForAction(value: boolean): void {

        isWaitingForAction = value;
    }

    function handlePressedKeys(): void {

        // -------------------------------------- MOVE ACTION --------------------------------------

        if (moveActionManager.isActionPossible() === true) {

            const moveDestionVector = {x: 0, y: 0};

            if (inputManager.isKeyPressed("KeyW") === true) moveDestionVector.y -= 1;

            if (inputManager.isKeyPressed("KeyS") === true) moveDestionVector.y += 1;
        
            if (inputManager.isKeyPressed("KeyA") === true) moveDestionVector.x -= 1;

            if (inputManager.isKeyPressed("KeyD") === true) moveDestionVector.x += 1;
            
            if (moveDestionVector.x !== 0 || moveDestionVector.y !== 0) {

                isWaitingForAction = false;
                moveActionManager.performAction(moveDestionVector);
            }
        }   
    }

    function actionFinished(): void {

        isWaitingForAction = true;

        // debugger
        handlePressedKeys();

        if ((isWaitingForAction as boolean) === false) {

            setIsWaitingForAction(true);
        }
    }

    return {

        initialize,
        setIsWaitingForAction,
        handlePressedKeys,
        actionFinished
    }
})();