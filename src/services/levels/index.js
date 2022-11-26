import LevelDTO from '../../dtos/level';

import levelSprites from './sprites';
import levelCollisionBlocks from './collisionBlocks';
import levelDoors from './doors';

const levels = {
    1: new LevelDTO(
        { 
            position: levelSprites['1'].position,
            imageSrc:  levelSprites['1'].imageSrc
        },
        {
            levelNumber: 1,
            bossRoom: false,
            collisionBlocksArray: levelCollisionBlocks['1'],
            doors: levelDoors['1']
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
            collisionBlocksArray: levelCollisionBlocks['2'],
            doors: levelDoors['2']
        }
    ),
    3: new LevelDTO(
        { 
            position: levelSprites['3'].position,
            imageSrc:  levelSprites['3'].imageSrc
        },
        {
            levelNumber: 3,
            bossRoom: false,
            collisionBlocksArray: levelCollisionBlocks['3'],
            doors: levelDoors['3']
        }
    ),
};

export default levels;
