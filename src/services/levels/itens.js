import ItemDTO from '../../dtos/item';

import frames from '../frames';

import HammerSprite from '../../assets/sprites/hammer.png'
import LifeSprite from '../../assets/sprites/life.png';

const levelItens = {
    1: [],
    2: [
        new ItemDTO(
            {
                position: {
                    x: 150,
                    y: 450
                },
                imageSrc: LifeSprite,
                frameRate: 2,
                frameBuffer: 250,
                loop: true,
                autoplay: true,
                frames: [frames.lifeAcquired],
                type: 'life'
            }
        )
    ],
    3: []
};

export default levelItens;
