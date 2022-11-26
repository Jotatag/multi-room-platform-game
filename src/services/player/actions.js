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
            globalContext.currentPlayer.position.x = 96;
            globalContext.currentPlayer.position.y = 140;
            globalContext.currentPlayer.collisionBlocks = levels[globalContext.currentLevel].collisionBlocks;
            globalContext.currentPlayer.switchSprite('idleRight');
            globalContext.currentPlayer.currentLevel = globalContext.currentLevelInstance;
            globalContext.currentPlayer.preventInput = false;
        }
    });
}