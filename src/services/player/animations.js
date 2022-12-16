import { changeLevel, togglePreventInput, finishAttack, beInvunerable } from './actions';

import PlayerIdleRight from '../../assets/sprites/king/idle.png';
import PlayerIdleLeft from '../../assets/sprites/king/idleLeft.png';
import PlayerRunRight from '../../assets/sprites/king/runRight.png';
import PlayerIdRunLeft from '../../assets/sprites/king/runLeft.png';
import PlayerEnterDoor from '../../assets/sprites/king/enterDoor.png';

import PlayerAttackRight from '../../assets/sprites/king/attackRight.png';
import PlayerAttackLeft from '../../assets/sprites/king/attackLeft.png';

import InvunerableRight from '../../assets/sprites/king/invunerableRight.png'

const playerAnimations = {
    idleRight: {
        frameRate: 11,
        frameBuffer: 20,
        loop: true,
        imageSrc: PlayerIdleRight
    },
    idleLeft: {
        frameRate: 11,
        frameBuffer: 20,
        loop: true,
        imageSrc: PlayerIdleLeft
    },
    runRight: {
        frameRate: 8,
        frameBuffer: 20,
        loop: true,
        imageSrc: PlayerRunRight
    },
    runLeft: {
        frameRate: 8,
        frameBuffer: 20,
        loop: true,
        imageSrc: PlayerIdRunLeft
    },
    enterDoor: {
        frameRate: 8,
        frameBuffer: 20,
        loop: false,
        imageSrc: PlayerEnterDoor,
        onComplete: () => {
            changeLevel();
        }
    },
    attackRight: {
        frameRate: 3,
        frameBuffer: 30,
        loop: false,
        imageSrc: PlayerAttackRight,
        onComplete: () => {
            togglePreventInput();
            finishAttack();
        }
    },
    attackLeft: {
        frameRate: 3,
        frameBuffer: 30,
        loop: false,
        imageSrc: PlayerAttackLeft,
        onComplete: () => {
            togglePreventInput();
            finishAttack();
        }
    },
    invunerableRight: {
        frameRate: 11,
        frameBuffer: 30,
        loop: false,
        imageSrc: InvunerableRight,
        onComplete: () => {
            beInvunerable(false);
        }
    }
}

export default playerAnimations;
