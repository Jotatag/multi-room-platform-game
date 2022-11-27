import ItemDTO from '../../dtos/item';

import frames from '../frames';

import HammerSprite from '../../assets/sprites/hammer.png'

const levelItens = {
    1: [],
    2: [
        new ItemDTO(
            {
                position: {
                    x: 150,
                    y: 400
                },
                imageSrc: HammerSprite,
                frameRate: 2,
                frameBuffer: 150,
                loop: true,
                autoplay: true,
                frames: [frames.weaponAcquired]
            }
        )
    ],
    3: []
};

export default levelItens;
