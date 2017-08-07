/**
 * @fileOverview canvas-playground-top component file
 * @author Dino Ivankov <dinoivankov@gmail.com>
 * @version 1.1.0

 */

const _ = require('lodash');

var _appWrapper = window.getAppWrapper();
var appState = _appWrapper.getAppState();

/**
 * Canvas playground top component
 *
 * @name canvas-playground-top
 * @property {string}   name        Name of the component
 * @property {string}   template    Component template contents
 * @property {string[]} props       Component properties
 * @property {Function} data        Data function
 * @property {Object}   methods     Component methods
 * @property {Object}   watch       Component watchers
 * @property {Object}   computed    Computed properties
 * @property {Object}   components  Child components
 */
let componentData = {
    name: 'canvas-playground-top',
    template: '',
    defaultData: {},
    data: function () {
        return appState.userData.canvasPlaygroundData;
    },
    created: function(){
        this.defaultData = _.cloneDeep(appState.appData.canvasPlaygroundDefaultData);
    },
    updated: function(){
        this.saveUserData();
    },
    methods: {
        resetAll: function(){
            let dataKeys = Object.keys(this.$data);
            for (let i=0; i<dataKeys.length;i++){
                if (dataKeys[i] !== 'animationId'){
                    appState.userData.canvasPlaygroundData[dataKeys[i]] = this.defaultData[dataKeys[i]];
                }
            }
        },
        saveImage: function(){
            this.$el.querySelector('.file-picker').click();
        },
        doSaveImage: async function(e){
            let fileName = e.target.value;
            e.target.value = '';
            if (fileName){
                let canvas = this.$el.querySelector('.canvas-one');
                let iDataUrl = canvas.toDataURL('image/png');
                let regex = /^data:.+\/(.+);base64,(.*)$/;

                let matches = iDataUrl.match(regex);
                let data = matches[2];
                let buffer = new Buffer(data, 'base64');
                await _appWrapper.fileManager.writeFileSync(fileName, buffer);
                let isSaved = await _appWrapper.fileManager.isFile(fileName);
                if (isSaved){
                    _appWrapper.addUserMessage('Image saved', 'info', [], false, true, true);
                } else {
                    _appWrapper.addUserMessage('Could not save image', 'error', [], false, true);
                }
            } else {
                _appWrapper.addUserMessage('No file selected', 'error', [], false, true);
            }
        },
        saveUserData: async function(e, noNotification) {
            if (e && e.target && e.target.hasClass('button-disabled')){
                return;
            }
            let userDataHelper = _appWrapper.getHelper('userData');
            let saved = await userDataHelper.saveUserData(appState.userData);
            if (saved && !noNotification){
                // _appWrapper.addUserMessage('User data saved.', 'info', []);
            }
        },
    },
    computed: {
        appState: function(){
            return appState;
        },
        dataChanged: function(){
            let currentData = JSON.stringify(this.$data);
            let defaultData = JSON.stringify(this.defaultData);
            let result = currentData != defaultData;
            currentData = null;
            defaultData = null;
            return result;
        }
    },
    watch: {}
};

exports.component = async (resolve) => {
    if (this && this.component && this.component._prepareParams){
        let componentHelper = _appWrapper.getHelper('component');
        let params = _.concat([componentData], this.component._prepareParams);
        componentData = await componentHelper.prepareComponentArray(params);
    } else {
        componentData.template = await _appWrapper.fileManager.loadFile(__dirname + '/' + componentData.name + '.html');
    }
    resolve(componentData);
};