import React, { useEffect, useRef } from 'react';

import * as Styles from './styles';

import C from '../../services/canvas';

import PlayerDTO from '../../dtos/player';
import { Level1 } from '../../services/getLevels';

const Canvas = (props) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        C.setCanvasInstance(canvasRef.current);

        C.getCanvasInstance().width = 64 * 16;
        C.getCanvasInstance().height = 64 * 9;

        const player = new PlayerDTO();

        const animate = () => {
            window.requestAnimationFrame(animate);
            Level1.draw();
            
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
