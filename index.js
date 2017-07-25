const path = require('path');
exports.componentDir = path.resolve(path.join(__dirname, './components'));
exports.componentMapping = [
    {
        'canvas-playground': {
            name: 'canvas-playground',
            components: {
                'canvas-playground-top': {
                    name: 'canvas-playground-top',
                    components: {}
                }
            }
        }
    }
];