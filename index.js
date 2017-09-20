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
exports.translations = {
    'en-US': require(path.resolve(path.join(__dirname, './data/translations/en-US.i18n.js'))).data,
    'sr-Cyrl-RS': require(path.resolve(path.join(__dirname, './data/translations/sr-Cyrl-RS.i18n.js'))).data,
    'sr-Latn-RS': require(path.resolve(path.join(__dirname, './data/translations/sr-Latn-RS.i18n.js'))).data
};