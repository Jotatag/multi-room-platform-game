import C from '../../services/canvas';

class CollisionBlockDTO {
    constructor({ position }) {
        this.position = position;
        this.width = 64;
        this.height = 64;
    }

    draw() {
        C.getCanvasContext().fillStyle = 'rgba(255, 0, 0, 0.5)';
        C.getCanvasContext().fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

export default CollisionBlockDTO;
