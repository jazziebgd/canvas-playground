const _ = require('lodash');

var _appWrapper = window.getAppWrapper();
var appState = _appWrapper.getAppState();

let componentData = {
    name: 'canvas-playground',
    template: '',
    defaultData: {},
    data: function () {
        return appState.userData.canvasPlaygroundData;
    },
    created: function(){
        appState.userData.canvasPlaygroundData.animationId = '';
        this.defaultData = _.cloneDeep(appState.appData.canvasPlaygroundDefaultData);
    },
    mounted: function(){
        this.setupCanvas();
        this.drawCanvas();
        this.$forceUpdate();
    },
    updated: function(){
        if (!this.animateCanvas){
            if (this.animationId){
                this.stopAnimating();
            } else {
                this.drawCanvas();
            }
        } else if (!this.animationId) {
            this.animate();
        }
        this.saveUserData();
    },
    destroyed: function(){
        if (this.animateCanvas){
            this.stopAnimating();
        }
    },
    methods: {
        resetAll: function(){
            let dataKeys = Object.keys(this.$data);
            for (let i=0; i<dataKeys.length;i++){
                if (dataKeys[i] !== 'animationId'){
                    this.$data[dataKeys[i]] = this.defaultData[dataKeys[i]];
                }
            }
            this.setupCanvas();
            // this.$forceUpdate();
        },
        setupCanvas: function(){
            let fullWidth = parseInt(this.$el.getRealDimensions().width, 10);
            let canvasStyles = this.$el.querySelector('canvas').getComputedStyles();

            let widthOffsetProperties = ['padding-left', 'padding-right', 'border-left-width', 'border-right-width'];
            for (let i=0; i<widthOffsetProperties.length; i++){
                if (canvasStyles[widthOffsetProperties[i]] && parseFloat(canvasStyles[widthOffsetProperties[i]], 10)){
                    fullWidth -= parseFloat(canvasStyles[widthOffsetProperties[i]], 10);
                }
            }

            this.canvasMinWidth = 2 * this.smileyRadius + 2 * this.canvasBleed;
            this.canvasMinHeight = 2 * this.smileyRadius + 2 * this.canvasBleed;

            this.canvasMaxWidth = fullWidth;
            // this.canvasWidth = fullWidth;
            // this.smileyCenterX = fullWidth / 2;
            // this.smileyCenterY = this.canvasHeight / 2;
        },
        drawCanvas: function(){
            if (this.autoClear){
                this.clearCanvas();
            }
            this.drawSmiley();
        },
        drawSmiley: function(){
            let canvas = this.$el.querySelector('.canvas-one');
            let ctx = canvas.getContext('2d');

            if (this.autoSize){
                this.canvasWidth = (this.smileyRadius + this.canvasBleed) * 2;
                this.canvasHeight = (this.smileyRadius + this.canvasBleed) * 2;

                if (this.canvasWidth < this.canvasMinWidth){
                    this.canvasWidth = this.canvasMinWidth;
                }

                if (this.canvasHeight < this.canvasMinHeight){
                    this.canvasHeight = this.canvasMinHeight;
                }
            }


            if (!(this.animationId && this.gravity) && this.autoCenter){
                this.smileyCenterX = this.canvasWidth / 2;
                this.smileyCenterY = this.canvasHeight / 2;
            }

            if (this.autoStrokeWidth){
                this.smileyStroke.width = this.smileyRadius / 50;
                this.mouthStroke.width = this.smileyRadius / 50;
            }

            let bgChunks = this.hexToDecColor(this.canvasBackground.hex);
            if(bgChunks && bgChunks.length && bgChunks.length >= 3){
                this.canvasBackground.red = bgChunks[0];
                this.canvasBackground.green = bgChunks[1];
                this.canvasBackground.blue = bgChunks[2];
            }

            let sfChunks = this.hexToDecColor(this.smileyFill.hex);
            if(sfChunks && sfChunks.length && sfChunks.length >= 3){
                this.smileyFill.red = sfChunks[0];
                this.smileyFill.green = sfChunks[1];
                this.smileyFill.blue = sfChunks[2];
            }

            let efChunks = this.hexToDecColor(this.eyeFill.hex);
            if(efChunks && efChunks.length && efChunks.length >= 3){
                this.eyeFill.red = efChunks[0];
                this.eyeFill.green = efChunks[1];
                this.eyeFill.blue = efChunks[2];
            }

            let ssChunks = this.hexToDecColor(this.smileyStroke.hex);
            if(ssChunks && ssChunks.length && ssChunks.length >= 3){
                this.smileyStroke.red = ssChunks[0];
                this.smileyStroke.green = ssChunks[1];
                this.smileyStroke.blue = ssChunks[2];
            }

            let msChunks = this.hexToDecColor(this.mouthStroke.hex);
            if(msChunks && msChunks.length && msChunks.length >= 3){
                this.mouthStroke.red = msChunks[0];
                this.mouthStroke.green = msChunks[1];
                this.mouthStroke.blue = msChunks[2];
            }

            ctx.strokeStyle = 'rgba(' + this.smileyStroke.red + ', ' + this.smileyStroke.green + ', ' + this.smileyStroke.blue + ', ' + this.smileyStroke.alpha + ')';
            ctx.lineWidth = this.smileyStroke.width;
            ctx.lineCap = 'round';



            let mouthStartX = this.smileyCenterX + this.smileyRadius * 0.7;
            let mouthStartY = this.smileyCenterY;
            let mouthRadius = this.smileyRadius * 0.7;

            let eyeRadius = this.smileyRadius * 0.1;

            let leftEyeCenterX = this.smileyCenterX - this.smileyRadius * 0.3;
            let leftEyeCenterY = this.smileyCenterY - this.smileyRadius * 0.2;
            let leftEyeStartX = leftEyeCenterX + eyeRadius;
            let leftEyeStartY = leftEyeCenterY;

            let rightEyeCenterX = this.smileyCenterX + this.smileyRadius * 0.3;
            let rightEyeCenterY = this.smileyCenterY - this.smileyRadius * 0.2;
            let rightEyeStartX = rightEyeCenterX + eyeRadius;
            let rightEyeStartY = rightEyeCenterY;


            if (this.canvasBackground.alpha > 0){
                ctx.fillStyle = 'rgba(' + this.canvasBackground.red + ', ' + this.canvasBackground.green + ', ' + this.canvasBackground.blue + ', ' + this.canvasBackground.alpha + ')';
                ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
            }

            // Outer circle
            ctx.beginPath();
            ctx.fillStyle = 'rgba(' + this.smileyFill.red + ', ' + this.smileyFill.green + ', ' + this.smileyFill.blue + ', ' + this.smileyFill.alpha + ')';
            ctx.arc(this.smileyCenterX, this.smileyCenterY, this.smileyRadius, 0, Math.PI * 2, true);
            ctx.fill();
            if (this.smileyStroke.enabled){
                ctx.stroke();
            }
            ctx.closePath();

            // Mouth (clockwise)
            ctx.moveTo(mouthStartX, mouthStartY);
            ctx.strokeStyle = 'rgba(' + this.mouthStroke.red + ', ' + this.mouthStroke.green + ', ' + this.mouthStroke.blue + ', ' + this.mouthStroke.alpha + ')';
            ctx.lineWidth = this.mouthStroke.width;
            ctx.beginPath();
            ctx.arc(this.smileyCenterX, this.smileyCenterY, mouthRadius, 0, Math.PI, false);
            ctx.stroke();
            ctx.closePath();

            // Left eye
            ctx.moveTo(leftEyeStartX, leftEyeStartY);
            ctx.fillStyle = 'rgba(' + this.eyeFill.red + ', ' + this.eyeFill.green + ', ' + this.eyeFill.blue + ', ' + this.eyeFill.alpha + ')';
            ctx.beginPath();
            ctx.arc(leftEyeCenterX, leftEyeCenterY, eyeRadius, 0, Math.PI * 2, true);

            // Right eye
            ctx.moveTo(rightEyeStartX, rightEyeStartY);
            ctx.arc(rightEyeCenterX, rightEyeCenterY, eyeRadius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();
        },
        clearCanvas: function(){
            let canvas = this.$el.querySelector('.canvas-one');
            let ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        },
        animate: function(){
            let canvas = this.$el.querySelector('.canvas-one');
            let ctx = canvas.getContext('2d');
            if (!this.gravity){
                ctx.translate((this.smileyCenterX), (this.smileyCenterY));
                let step = 360 / this.animationFrameSkip;
                let angle = ((Math.PI / 180) * step);
                ctx.rotate(angle);
                ctx.translate(-(this.smileyCenterX), -(this.smileyCenterY));
            }
            this.clearCanvas();

            if (this.smileyCenterY > this.canvasHeight - this.canvasBleed - this.smileyRadius){
                this.vY = -(this.vY * this.dYTimes);
            } else if (this.smileyCenterY < this.canvasBleed + this.smileyRadius){
                this.vY = -(this.vY * this.dYTimes);
            }

            if (this.gravity){
                this.smileyCenterY += this.vY;
                this.vY *= this.dYTimes;
                this.vY += this.dYPlus;
            }

            this.drawSmiley();
            if (this.animationCounter < this.animationFrameSkip){
                this.animationCounter++;
                this.animationId = window.requestAnimationFrame(this.animate.bind(this));
            } else {
                this.animationCounter = 0;
                this.animationId = window.requestAnimationFrame(this.animate.bind(this));
            }
        },
        stopAnimating: function(){
            window.cancelAnimationFrame(this.animationId);
            this.animationId = '';
            this.animationCounter = 0;
            let canvas = this.$el.querySelector('.canvas-one');
            let ctx = canvas.getContext('2d');
            ctx.resetTransform();
            this.clearCanvas();
            this.drawSmiley();
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
                _appWrapper.addUserMessage('User data saved.', 'info', []);
            }
        },
        userDataChanged: function(){
            let utilHelper = _appWrapper.getHelper('util');
            var currentData = _.cloneDeep(this.$data);
            var oldData = _.cloneDeep(appState.userData.canvasPlaygroundData);
            var dataDiff = utilHelper.difference(oldData, currentData);
            return Object.keys(dataDiff).length;
        },
        canvasClick: function (e) {
            if (this.animationId && this.gravity){
                let clientX = e.clientX;
                let clientY = e.clientY;
                let offsetLeft = e.target.offsetLeft;
                let offsetTop = e.target.offsetTop;
                let left = clientX - offsetLeft;
                let top = clientY - offsetTop;
                if (top < this.smileyRadius + 10){
                    top = this.smileyRadius + 10;
                } else if (top > this.canvasHeight - (this.smileyRadius + 10)){
                    top = this.canvasHeight - (this.smileyRadius + 10);
                }
                if (left < this.smileyRadius + 10){
                    left = this.smileyRadius + 10;
                } else if (left > this.canvasWidth - (this.smileyRadius + 10)){
                    left = this.canvasWidth - (this.smileyRadius + 10);
                }
                this.smileyCenterX = left;
                this.smileyCenterY = top;
            }
        }
    },
    computed: {
        appState: function(){
            return appState;
        },
        dataChanged: function(){
            return JSON.stringify(this.$data) != JSON.stringify(this.defaultData);
        }
    },
    watch: {
        gravity: function(){
            let canvas = this.$el.querySelector('.canvas-one');
            let ctx = canvas.getContext('2d');
            ctx.resetTransform();
        }
    }
};

exports.component = async (resolve) => {
    await _appWrapper.getHelper('userData').loadUserData();

    if (this && this.component && this.component._prepareParams){
        let componentHelper = _appWrapper.getHelper('component');
        let params = _.concat([componentData], this.component._prepareParams);
        componentData = await componentHelper.prepareComponentArray(params);
    } else {
        componentData.template = await _appWrapper.fileManager.loadFile(__dirname + '/' + componentData.name + '.html');
    }
    if (appState.userData){
        if (!appState.userData.canvasPlaygroundData){
            appState.userData.canvasPlaygroundData = {};
        }
        _.defaultsDeep(appState.userData.canvasPlaygroundData, appState.appData.canvasPlaygroundDefaultData);
    }
    resolve(componentData);
};