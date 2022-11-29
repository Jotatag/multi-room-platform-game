import React, { useEffect, useRef } from 'react';

import * as Styles from './styles';

import C from '../../services/canvas';
import globalContext from '../../services/context';

import Player from '../../services/player';
import levelBosses from '../../services/boss';

import overlay from '../../services/levels/overlay';

const Canvas = (props) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        C.setCanvasInstance(canvasRef.current);

        C.getCanvasInstance().width = 64 * 16;
        C.getCanvasInstance().height = 64 * 9;

        globalContext.currentPlayer = Player();
        if(!globalContext.currentPlayer) return;

        const animate = () => {
            window.requestAnimationFrame(animate);
            globalContext.currentLevelInstance.draw();
            globalContext.currentLevelInstance.drawCollisions();
            globalContext.currentLevelInstance.drawDoors();
            globalContext.currentLevelInstance.drawItens();
            
            if(globalContext.currentLevelInstance.bossRoom) {
                globalContext.currentPlayer.currentBoss = levelBosses[globalContext.currentLevel];
                levelBosses[globalContext.currentLevel].player= globalContext.currentPlayer;
                levelBosses[globalContext.currentLevel].checkMovement();
                levelBosses[globalContext.currentLevel].draw();
                if(levelBosses[globalContext.currentLevel].currentAttack) {
                    levelBosses[globalContext.currentLevel].currentAttack.update();
                    levelBosses[globalContext.currentLevel].currentAttack.draw();
                }
                levelBosses[globalContext.currentLevel].update();
                levelBosses[globalContext.currentLevel].drawAttackHitBox();
            }

            globalContext.currentPlayer.checkMovement();
            globalContext.currentPlayer.draw();
            globalContext.currentPlayer.update();

            globalContext.currentLevelInstance.drawFrames();

            C.getCanvasContext().save();
            C.getCanvasContext().globalAlpha = overlay.opacity;
            C.getCanvasContext().fillStyle = 'black';
            C.getCanvasContext().fillRect(0, 0, C.getCanvasInstance().width, C.getCanvasInstance().height);
            C.getCanvasContext().restore();
        }

        animate();
    }, []);

    return (
        <Styles.Canvas ref={canvasRef} {...props} />
    );
};

export default Canvas;
