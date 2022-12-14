import SpriteDTO from '../sprite';

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

}

export default ItemDTO;
