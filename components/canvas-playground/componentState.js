exports.appState = {
    appData: {
        canvasPlaygroundDefaultData: {

            autoClear: true,
            autoSize: false,
            autoStrokeWidth: true,
            autoCenter: true,

            smileyCenterX: 150,
            smileyCenterY: 100,


            canvasWidth: 200,
            canvasHeight: 300,
            canvasBleed: 5,

            canvasMaxWidth: 500,
            canvasMaxHeight: 1000,

            canvasMinWidth: 60,
            canvasMinHeight: 60,

            smileyRadius: 50,

            animateCanvas: false,
            animationCounter: 0,
            animationFrameSkip: 30,
            animationId: '',
            manualAnimation: false,

            gravity: true,
            vX: 0,
            vY: 3,

            dXTimes: 1,
            dXPlus: 0.0,

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
        canvasPlaygroundData: {}
    },
};