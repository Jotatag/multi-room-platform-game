import C from '../../services/canvas';

class SpriteDTO {
    constructor({
        position,
        imageSrc,
        frameRate=1,
        animations,
        frameBuffer=12,
        loop = true,
        autoplay = true
    }) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
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
        const cropBox = {
            position: {
                x: this.width * this.currentFrame,
                y: 0,
            },
            width: this.width,
            height: this.height
        }

        C.getCanvasContext().drawImage(
            this.image,
            cropBox.position.x,
            cropBox.position.y,
            cropBox.width,
            cropBox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        this.updateFrames();
    }

    onLoadSprite() {
        this.loaded = true;
        this.width = this.image.width / this.frameRate;
        this.height = this.image.height;
    }

    play() {
        this.autoplay = true;
    }

    updateFrames() {
        if (!this.autoplay) return;
        this.elapsedFrames++;

        if(this.elapsedFrames % this.frameBuffer === 0) {
            if(this.currentFrame < this.frameRate - 1) this.currentFrame++;
            else if(this.loop) this.currentFrame = 0;
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
