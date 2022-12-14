import FrameDTO from '../../dtos/frame';

import frameAnimations from './animations';

import WeaponFrame from '../../assets/sprites/frames/frameWA.png';
import LifeFrame from '../../assets/sprites/frames/frameLA.png';

const frames = {
    weaponAcquired: new FrameDTO({
        position: {
            x: 352,
            y: 576
        },
        imageSrc: WeaponFrame,
        autoplay: false,
        loop: false,
        frameBuffer: 2.5,
        animation: frameAnimations.up
    }),
    lifeAcquired: new FrameDTO({
        position: {
            x: 352,
            y: 576
        },
        imageSrc: LifeFrame,
        autoplay: false,
        loop: false,
        frameBuffer: 2.5,
        animation: frameAnimations.up
    })
};

export default frames;
