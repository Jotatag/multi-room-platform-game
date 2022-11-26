import SpriteDTO from '../sprite';

class ItemDTO extends SpriteDTO {
    constructor(
        { 
            position,
            imageSrc,
            frameRate,
            frameBuffer,
            loop,
            autoplay
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
    }

    
}

export default ItemDTO;
