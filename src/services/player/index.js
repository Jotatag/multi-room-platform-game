import globalContext from '../context';

import GuiDTO from '../../dtos/gui';
import LifeSprite from '../../assets/sprites/king/lifes.png';

import PlayerDTO from '../../dtos/player';

import PlayerIdleRight from '../../assets/sprites/king/idle.png';
import playerAnimations from './animations';

const maxHealth = 3;
const currentHealth = 2;

const PlayerGui = new GuiDTO(
    {
        position: {
            x: 880,
            y: 500
        },
        imageSrc: LifeSprite,
        frameRate: maxHealth
    }
);

const Player = () => new PlayerDTO({ 
    collisionBlocks: globalContext.currentLevelInstance.collisionBlocks,
    currentLevel: globalContext.currentLevelInstance,
    imageSrc: PlayerIdleRight,
    frameRate: 11,
    animations: playerAnimations,
    gui: PlayerGui,
    maxHealth: maxHealth,
    currentHealth: currentHealth
 });

 export default Player;
