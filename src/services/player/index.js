import globalContext from '../context';

import PlayerDTO from '../../dtos/player';

import PlayerIdleRight from '../../assets/sprites/king/idle.png';
import playerAnimations from './animations';

const Player = () => new PlayerDTO({ 
    collisionBlocks: globalContext.currentLevelInstance.collisionBlocks,
    imageSrc: PlayerIdleRight,
    frameRate: 11,
    animations: playerAnimations
 });

 export default Player;
