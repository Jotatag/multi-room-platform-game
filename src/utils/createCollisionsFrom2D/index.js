import CollisionBlockDTO from '../../dtos/collisionBlock';

const createCollisionsFrom2D = (collisionBlocks2D) => {
    const collisionBlocks = [];
    collisionBlocks2D.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if(symbol !== 292) return;

            collisionBlocks.push(
                new CollisionBlockDTO({
                    position: {
                        x: x * 64,
                        y: y * 64
                    }
                })
            );
        });
    });
    return collisionBlocks;
};

export default createCollisionsFrom2D;
