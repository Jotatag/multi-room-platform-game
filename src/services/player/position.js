import globalContext from '../context';
import levels from '../levels';

export const startPosition = () => {
    if(!globalContext.currentPlayer) return;

    globalContext.currentPlayer.position.x = 96;
    globalContext.currentPlayer.position.y = 140;
    globalContext.currentPlayer.collisionBlocks = levels[globalContext.currentLevel].collisionBlocks;
    globalContext.currentPlayer.switchSprite('idleRight');
    globalContext.currentPlayer.preventInput = false;
}