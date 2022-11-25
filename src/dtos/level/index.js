import Object from '../object';

class LevelDTO extends Object {
    constructor(collisionBlocks2D, properties, sprite) {
        super(collisionBlocks2D);
        this.properties = properties;
        this.sprite = sprite;
    }

    draw() {
        this.sprite.draw();
        this.drawCollisions();
    }
}

export default LevelDTO;
