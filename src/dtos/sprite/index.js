import globalContext from '../../services/context';
import C from '../../services/canvas';

class SpriteDTO {
    constructor({
        position,
        imageSrc,
        verticalSrc,
        frameRate=1,
        animations,
        frameBuffer=12,
        loop = true,
        autoplay = true
    }) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.verticalSrc = verticalSrc;
        this.image.onload = () => this.onLoadSprite();
        this.loaded = false;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.elapsedFrames = 0;
        this.frameBuffer = frameBuffer;
        this.animations = animations;
        this.loop = loop;
        this.autoplay = autoplay;
        this.currentAnimation = null;
        this.cropBox = null;
        this.animationCompleted = false;
        this.animationIsActive = false;

        if(this.animations) {
            for(let key in this.animations) {
                const image = new Image();
                image.src = this.animations[key].imageSrc;
                this.animations[key].image = image;
            }
        }
    }

    draw() {
        if(!this.loaded) return;
        this.updateCropBox();
        C.getCanvasContext().drawImage(
            this.image,
            this.cropBox.position.x,
            this.cropBox.position.y,
            this.cropBox.width,
            this.cropBox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        this.updateFrames();
    }

    onLoadSprite() {
        this.loaded = true;
        this.width = this.verticalSrc ? 
                     this.image.width : 
                     this.image.width / this.frameRate;
        this.height = this.verticalSrc ? 
                      this.image.height / this.frameRate : 
                      this.image.height;
    }

    updateCropBox() {
        this.cropBox = {
            position: {
                x: this.verticalSrc ? 
                   0 : 
                   this.width * this.currentFrame,
                y: this.verticalSrc ? 
                   this.height * this.currentFrame : 
                   0
            },
            width: this.width,
            height: this.height
        }
    }

    play() {
        this.autoplay = true;
        this.animationIsActive = true;
        this.animationCompleted = false;
    }

    updateFrames() {
        if(globalContext?.currentScreen?.name === 'pause') return;
        if (!this.autoplay) return;
        this.elapsedFrames++;

        if(this.elapsedFrames % this.frameBuffer === 0) {
            if(this.currentFrame < this.frameRate - 1) {
                this.animationCompleted = false;
                this.animationIsActive = true;
                this.currentFrame++;
            } else if(this.loop) { 
                this.currentFrame = 0;
            } else {
                this.animationCompleted = true;
                this.animationIsActive = false;
            }
        }

        if(this.currentAnimation?.onComplete) {
            if(this.currentFrame === this.frameRate - 1 
                && !this.currentAnimation.isActive) {
                    this.currentAnimation.onComplete();
                    this.currentAnimation.isActive = true;
            }
        }
    }
}

export default SpriteDTO;
