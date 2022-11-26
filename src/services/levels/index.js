import LevelDTO from '../../dtos/level';

import levelSprites from './sprites';
import collisionBlocks from './collisionBlocks';

const levels = {
    1: new LevelDTO(
        { 
            position: levelSprites['1'].position,
            imageSrc:  levelSprites['1'].imageSrc
        },
        {
            levelNumber: 1,
            bossRoom: false,
            collisionBlocksArray: collisionBlocks['1']
        }
    ),
    2: new LevelDTO(
        { 
            position: levelSprites['2'].position,
            imageSrc:  levelSprites['2'].imageSrc
        },
        {
            levelNumber: 2,
            bossRoom: false,
            collisionBlocksArray: collisionBlocks['2']
        }
    ),
};

export default levels;
