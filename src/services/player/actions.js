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
            globalContext.currentPlayer.position.x = levels[globalContext.currentLevel].startingPosition.x;
            globalContext.currentPlayer.position.y = levels[globalContext.currentLevel].startingPosition.y;
            globalContext.currentPlayer.collisionBlocks = levels[globalContext.currentLevel].collisionBlocks;
            globalContext.currentPlayer.switchSprite('idleRight');
            globalContext.currentPlayer.currentLevel = levels[globalContext.currentLevel];
            gsap.to(overlay, {
                opacity: 0,
                onComplete: () => {
                    globalContext.currentPlayer.preventInput = false;
                }
            });
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

export const beInvunerable = (invunerable) => {
    if(!globalContext.currentPlayer) return;
    console.log(invunerable);

    globalContext.currentPlayer.beInvunerable(invunerable);
}