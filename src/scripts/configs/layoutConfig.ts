import { anyComponentInitDataType } from "../../../submodules/glass/dist/main.js"

export const layoutConfig = [

    {
        id: 'background',
        type: 'sprite',
        assets: ['background'],
    },

    {

        id: 'basicTilesContainer',
        type: 'container',
        x: 200,
        y: 200,
    },

    {
        id: 'playerContainer',
        type: 'container',
        x: 200, y: 200,

        children: [

            {
                id: 'playerSprite',
                type: 'sprite',
                assets: ['player'],
                scale: 10,
            }
        ]
    }
] as anyComponentInitDataType[];