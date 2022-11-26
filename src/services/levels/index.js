import LevelDTO from '../../dtos/level';

import levelSprites from './sprites';
import levelCollisionBlocks from './collisionBlocks';
import levelDoors from './doors';
import levelItens from './itens';

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
            doors: levelDoors['1'],
            itens: levelItens['1']
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
            doors: levelDoors['2'],
            itens: levelItens['2']
        }
    ),
    3: new LevelDTO(
        { 
            position: levelSprites['1'].position,
            imageSrc:  levelSprites['1'].imageSrc
        },
        {
            levelNumber: 3,
            bossRoom: false,
            collisionBlocksArray: levelCollisionBlocks['1'],
            doors: levelDoors['1']
        }
    ),
};

export default levels;
