import React, { useEffect, useRef } from 'react';

import * as Styles from './styles';

import C from '../../services/canvas';
import globalContext from '../../services/context';

import Player from '../../services/player';

import overlay from '../../services/levels/overlay';

import DoorSprit from '../../assets/sprites/doorOpen.png';

import DoorDTO from '../../dtos/door';

const Canvas = (props) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        C.setCanvasInstance(canvasRef.current);

        C.getCanvasInstance().width = 64 * 16;
        C.getCanvasInstance().height = 64 * 9;

        globalContext.currentPlayer = Player();
        if(!globalContext.currentPlayer) return;

        const doors = [
            new DoorDTO(
                {
                    position: {
                        x: 767,
                        y: 270
                    },
                    imageSrc: DoorSprit,
                    frameRate: 5,
                    frameBuffer: 20,
                    loop: false,
                    autoplay: false
                },
                globalContext.currentPlayer
            )
        ];

        const animate = () => {
            window.requestAnimationFrame(animate);
            globalContext.currentLevelInstance.draw();
            globalContext.currentLevelInstance.drawCollisions();

            doors.forEach((door) => {
                door.draw();
            });
            
            globalContext.currentPlayer.checkMovement();
            globalContext.currentPlayer.draw();
            globalContext.currentPlayer.update();

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
}

export default Canvas;
