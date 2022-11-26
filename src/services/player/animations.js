import { changeLevel } from './actions';

import PlayerIdleRight from '../../assets/sprites/king/idle.png';
import PlayerIdleLeft from '../../assets/sprites/king/idleLeft.png';
import PlayerRunRight from '../../assets/sprites/king/runRight.png';
import PlayerIdRunLeft from '../../assets/sprites/king/runLeft.png';
import PlayerEnterDoor from '../../assets/sprites/king/enterDoor.png';

const playerAnimations = {
    idleRight: {
        frameRate: 11,
        frameBuffer: 35,
        loop: true,
        imageSrc: PlayerIdleRight
    },
    idleLeft: {
        frameRate: 11,
        frameBuffer: 35,
        loop: true,
        imageSrc: PlayerIdleLeft
    },
    runRight: {
        frameRate: 8,
        frameBuffer: 35,
        loop: true,
        imageSrc: PlayerRunRight
    },
    runLeft: {
        frameRate: 8,
        frameBuffer: 35,
        loop: true,
        imageSrc: PlayerIdRunLeft
    },
    enterDoor: {
        frameRate: 8,
        frameBuffer: 35,
        loop: false,
        imageSrc: PlayerEnterDoor,
        onComplete: () => {
            changeLevel();
        }
    }
}

export default playerAnimations;
