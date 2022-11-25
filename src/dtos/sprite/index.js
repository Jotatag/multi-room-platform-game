import C from '../../services/canvas';

class SpriteDTO {
    constructor({ position, imageSrc }) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.image.onload = () => {
            this.loaded = true;
        }
        this.loaded = false;
    }

    draw() {
        if(!this.loaded) return;
        C.getCanvasContext().drawImage(this.image, this.position.x, this.position.y);
    }    
}

export default SpriteDTO;
