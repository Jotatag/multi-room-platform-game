import SpriteDTO from '../sprite';

import C from '../../services/canvas';
class ItemDTO extends SpriteDTO {
    constructor(
        { 
            position,
            imageSrc,
            frameRate,
            frameBuffer,
            loop,
            autoplay,
            frames=[],
            type=null
        }
    ) {
        super({ 
            position,
            imageSrc,
            frameRate,
            frameBuffer,
            loop,
            autoplay
        });

        this.frames = frames;
        this.type = type;
    }

    drawCollision() {
        C.getCanvasContext().fillStyle = 'rgb(0, 0, 255, 0.5)';
        C.getCanvasContext().fillRect(this.position.x, this.position.y, this.width, this.height);
    }

}

export default ItemDTO;
