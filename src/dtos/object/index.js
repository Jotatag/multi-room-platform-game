import CollisionBlock from '../collisionBlock';
import parseArray2D from '../../utils/parse2D';

class Object {
    constructor(collisionBlocks2D) {
        this.collisionBlocks2D = parseArray2D(collisionBlocks2D);
        this.collisionBlocks = [];

        if(collisionBlocks2D) this.createCollisionsFrom2D();
    }

    createCollisionsFrom2D() {
        this.collisionBlocks2D.forEach((row, y) => {
            row.forEach((symbol, x) => {
                if(symbol !== 292) return;

                this.collisionBlocks.push(
                    new CollisionBlock({
                        position: {
                            x: x * 64,
                            y: y * 64
                        }
                    })
                );
            });
        });
    };

    drawCollisions() {
        this.collisionBlocks.forEach((block) => {
            block.draw();
        });
    }
}

export default Object;
