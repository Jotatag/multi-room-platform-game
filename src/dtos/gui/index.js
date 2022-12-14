import C from '../../services/canvas';

import SpriteDTO from '../sprite';

class GuiDTO extends SpriteDTO {
    constructor(
        { 
            position,
            imageSrc,
            frameRate=1,
            frameBuffer=1,
            loop=false,
            autoplay=false
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

export default GuiDTO;
