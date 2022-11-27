import gsap from 'gsap';

import globalContext from '../context';

import levels from '../levels';
import overlay from '../levels/overlay';

export const changeLevel = () => {
    if(!globalContext.currentPlayer) return;

    gsap.to(overlay, {
        opacity: 1,
        onComplete: () => {
            globalContext.currentLevel += 1;
            globalContext.currentLevelInstance = levels[globalContext.currentLevel];
            gsap.to(overlay, {
                opacity: 0
            });
            globalContext.currentPlayer.position.x = globalContext.currentLevelInstance.startingPosition.x;
            globalContext.currentPlayer.position.y = globalContext.currentLevelInstance.startingPosition.y;
            globalContext.currentPlayer.collisionBlocks = levels[globalContext.currentLevel].collisionBlocks;
            globalContext.currentPlayer.switchSprite('idleRight');
            globalContext.currentPlayer.currentLevel = globalContext.currentLevelInstance;
            globalContext.currentPlayer.preventInput = false;
        }
    });
}

export const togglePreventInput = () => {
    if(!globalContext.currentPlayer) return;

    globalContext.currentPlayer.preventInput = !globalContext.currentPlayer.preventInput;
}

export const finishAttack = () => {
    if(!globalContext.currentPlayer) return;

    globalContext.currentPlayer.attackHitBox = null;
}