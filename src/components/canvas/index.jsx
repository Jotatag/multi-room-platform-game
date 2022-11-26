import React, { useEffect, useRef } from 'react';

import * as Styles from './styles';

import C from '../../services/canvas';

import PlayerIdleRight from '../../assets/sprites/king/idle.png';
import PlayerIdleLeft from '../../assets/sprites/king/idleLeft.png';
import PlayerRunRight from '../../assets/sprites/king/runRight.png';
import PlayerIdRunLeft from '../../assets/sprites/king/runLeft.png';
import PlayerEnterDoor from '../../assets/sprites/king/enterDoor.png';

import DoorSprit from '../../assets/sprites/doorOpen.png';

import PlayerDTO from '../../dtos/player';
import DoorDTO from '../../dtos/door';
import { Level1 } from '../../services/getLevels';

const Canvas = (props) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        C.setCanvasInstance(canvasRef.current);

        C.getCanvasInstance().width = 64 * 16;
        C.getCanvasInstance().height = 64 * 9;

        const player = new PlayerDTO({ 
            collisionBlocks: Level1.collisionBlocks,
            imageSrc: PlayerIdleRight,
            frameRate: 11,
            animations: {
                idleRight: {
                    frameRate: 11,
                    frameBuffer: 12,
                    loop: true,
                    imageSrc: PlayerIdleRight
                },
                idleLeft: {
                    frameRate: 11,
                    frameBuffer: 12,
                    loop: true,
                    imageSrc: PlayerIdleLeft
                },
                runRight: {
                    frameRate: 8,
                    frameBuffer: 12,
                    loop: true,
                    imageSrc: PlayerRunRight
                },
                runLeft: {
                    frameRate: 8,
                    frameBuffer: 12,
                    loop: true,
                    imageSrc: PlayerIdRunLeft
                },
                enterDoor: {
                    frameRate: 8,
                    frameBuffer: 12,
                    loop: false,
                    imageSrc: PlayerEnterDoor
                }
            }
         });

        const doors = [
            new DoorDTO(
                {
                    position: {
                        x: 767,
                        y: 270
                    },
                    imageSrc: DoorSprit,
                    frameRate: 5,
                    frameBuffer: 25,
                    loop: false,
                    autoplay: false
                },
                player
            )
        ];

        const animate = () => {
            window.requestAnimationFrame(animate);
            Level1.draw();

            doors.forEach((door) => {
                door.draw();
            });
            
            player.checkMovement();
            player.draw();
            player.update();
        }

        animate();
    }, []);

    return (
        <Styles.Canvas ref={canvasRef} {...props} />
    );
}

export default Canvas;
