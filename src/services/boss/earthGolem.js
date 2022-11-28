import levels from '../levels';

import BossDTO from '../../dtos/boss';

import GolemIdleRight from '../../assets/sprites/boss/golem/idleRight.png';
import GolemIdleLeft from '../../assets/sprites/boss/golem/idleLeft.png';

import GolemLaserRight from '../../assets/sprites/boss/golem/laserRight.png';

const bossAnimations = {
    idleRight: {
        frameRate: 4,
        frameBuffer: 200,
        loop: true,
        imageSrc: GolemIdleRight
    },
    idleLeft: {
        frameRate: 4,
        frameBuffer: 200,
        loop: true,
        imageSrc: GolemIdleLeft
    },
}

const EarthGolem = new BossDTO({
    position: {
        x: 180,
        y: 150
    },
    collisionBlocks: levels[3].collisionBlocks,
    currentLevel: levels[3],
    imageSrc: GolemLaserRight,
    frameRate: 6,
    frameBuffer: 200,
    loop: true,
    animations: bossAnimations
});

export default EarthGolem;
