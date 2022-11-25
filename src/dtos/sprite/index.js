import C from '../../services/canvas';

class SpriteDTO {
    constructor({ position, imageSrc, frameRate = 1 }) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.image.onload = () => {
            this.loaded = true;
            this.width = this.image.width / this.frameRate;
            this.height = this.image.height;
        }
        this.loaded = false;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.elapsedFrames = 0;
        this.frameBuffer = 12;
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

    updateFrames() {
        this.elapsedFrames++;

        if(this.elapsedFrames % this.frameBuffer === 0) {
            if(this.currentFrame < this.frameRate - 1) this.currentFrame++;
            else this.currentFrame = 0;
        }
    }
}

export default SpriteDTO;
