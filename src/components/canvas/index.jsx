import React, { useEffect, useRef } from 'react';

import * as Styles from './styles';

import PlayerDTO from '../../dtos/player';

const Canvas = (props) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvasInstance = canvasRef.current;
        const canvasContext = canvasInstance.getContext('2d');

        canvasInstance.width = 64 * 16;
        canvasInstance.height = 64 * 9;

        const player = new PlayerDTO(canvasInstance);

        const animate = () => {
            window.requestAnimationFrame(animate);
            canvasContext.fillStyle = 'white';
            canvasContext.fillRect(0, 0, 1024, 576);
            
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
