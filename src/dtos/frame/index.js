import C from '../../services/canvas';

import SpriteDTO from '../sprite';

class FrameDTO extends SpriteDTO {
    constructor(
        { 
            position,
            imageSrc,
            loop,
            autoplay,
            frameBuffer,
            animation
        }
    ) {
        super({ 
            position,
            imageSrc,
            loop,
            autoplay,
            frameBuffer
        });

        this.animation = animation;
    }

    draw() {
        if(!this.loaded) return;
        C.getCanvasContext().drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        this.updateFrames();
    }

    updateFrames() {
        if (!this.autoplay) return;
        this.elapsedFrames++;

        if(this.elapsedFrames % this.frameBuffer === 0) {
            if(this.currentFrame < this.animation.duration) {
                if(this.animation.endPosition !== this.position.y) {
                    if(this.animation.direction === 'up') this.position.y--;
                    else this.position.y++;
                }
                this.currentFrame++;
            } else if(this.loop) { 
                this.currentFrame = 0;
            } else this.animation.ended = true;
        }
    }
}

export default FrameDTO;
