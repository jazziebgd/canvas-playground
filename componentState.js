exports.appState = {
    appData: {
        canvasPlaygroundData: {

            autoClear: true,
            autoSize: true,
            autoStrokeWidth: true,
            autoCenter: true,

            smileyCenterX: 150,
            smileyCenterY: 100,


            canvasWidth: 300,
            canvasHeight: 130,
            canvasBleed: 5,

            canvasMaxWidth: 500,
            canvasMaxHeight: 1000,

            canvasMinWidth: 50,
            canvasMinHeight: 50,

            smileyRadius: 50,

            animateCanvas: false,
            animationCounter: 0,
            animationFrameSkip: 30,
            animationId: '',

            gravity: false,
            vX: 0,
            vY: 3,

            dXTimes: 0.99,
            dXPlus: 0.1,

            dYTimes: 0.99,
            dYPlus: 0.1,

            canvasBackground: {
                hex: '#7F7F7F',
                red: 127,
                green: 127,
                blue: 127,
                alpha: 0,
                lock: true,
                all: 127,
            },

            smileyFill: {
                hex: '#FFFF00',
                red: 255,
                green: 255,
                blue: 0,
                alpha: 1,
                lock: false,
                all: 0,
            },

            eyeFill: {
                hex: '#000000',
                red: 0,
                green: 0,
                blue: 0,
                alpha: 1,
                lock: true,
                all: 0,
            },

            mouthStroke: {
                hex: '#000000',
                red: 0,
                green: 0,
                blue: 0,
                alpha: 1,
                lock: true,
                all: 0,
                width: 1,
            },

            smileyStroke: {
                enabled: true,
                hex: '#000000',
                red: 0,
                green: 0,
                blue: 0,
                alpha: 1,
                lock: true,
                all: 0,
                width: 1,
            },

        },
    },
};