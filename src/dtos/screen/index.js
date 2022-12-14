import SpriteDTO from '../sprite';

class ScreenDTO extends SpriteDTO {
    constructor(
        { 
            position,
            imageSrc,
            frameRate,
            frameBuffer,
            loop,
            autoplay,
            actions=null
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

        this.actions = actions;
        if(this.actions) this.actions();
    }
}

export default ScreenDTO;
