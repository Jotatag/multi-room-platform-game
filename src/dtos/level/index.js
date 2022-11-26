import SpriteDTO from '../sprite';
import CollisionBlockDTO from '../collisionBlock';
import parseArray2D from '../../utils/parse2D';

class LevelDTO extends SpriteDTO {
    constructor(
        {
            position, 
            imageSrc
        },
        {
            levelNumber,
            bossRoom=false,
            collisionBlocksArray=[]
        }
    ) {
        super({ position, imageSrc });

        this.collisionBlocksArray = collisionBlocksArray;
        this.collisionBlocks2D = parseArray2D(this.collisionBlocksArray);
        this.collisionBlocks = [];
        if(this.collisionBlocks2D) this.createCollisionsFrom2D();

        this.levelNumber = levelNumber;
        this.bossRoom = bossRoom;
    }

    createCollisionsFrom2D() {
        this.collisionBlocks2D.forEach((row, y) => {
            row.forEach((symbol, x) => {
                if(symbol !== 292) return;

                this.collisionBlocks.push(
                    new CollisionBlockDTO({
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

export default LevelDTO;
