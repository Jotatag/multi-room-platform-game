import { changeLevel, togglePreventInput, finishAttack } from './actions';

import PlayerIdleRight from '../../assets/sprites/king/idle.png';
import PlayerIdleLeft from '../../assets/sprites/king/idleLeft.png';
import PlayerRunRight from '../../assets/sprites/king/runRight.png';
import PlayerIdRunLeft from '../../assets/sprites/king/runLeft.png';
import PlayerEnterDoor from '../../assets/sprites/king/enterDoor.png';

import PlayerAttackRight from '../../assets/sprites/king/attackRight.png';
import PlayerAttackLeft from '../../assets/sprites/king/attackLeft.png';

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
    },
    attackRight: {
        frameRate: 3,
        frameBuffer: 80,
        loop: false,
        imageSrc: PlayerAttackRight,
        onComplete: () => {
            togglePreventInput();
            finishAttack();
        }
    },
    attackLeft: {
        frameRate: 3,
        frameBuffer: 80,
        loop: false,
        imageSrc: PlayerAttackLeft,
        onComplete: () => {
            togglePreventInput();
            finishAttack();
        }
    }
}

export default playerAnimations;
