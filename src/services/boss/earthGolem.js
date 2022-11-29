import levels from '../levels';

import BossDTO from '../../dtos/boss';
import AttackDTO from '../../dtos/boss/attack';

import GolemIdleRight from '../../assets/sprites/boss/golem/idleRight.png';
import GolemIdleLeft from '../../assets/sprites/boss/golem/idleLeft.png';

import GolemLaserRight from '../../assets/sprites/boss/golem/laserRight.png';

import AttackLaserRight from '../../assets/sprites/boss/golem/attack/laserRight.png';

import AttackMeeleRight from '../../assets/sprites/boss/golem/attack/meeleRight2.png'

const bossAnimations = {
    idleRight: {
        frameRate: 4,
        frameBuffer: 200,
        loop: true,
        type: 'neutral',
        imageSrc: GolemIdleRight
    },
    idleLeft: {
        frameRate: 4,
        frameBuffer: 200,
        loop: true,
        type: 'neutral',
        imageSrc: GolemIdleLeft
    },
    meeleRight: {
        frameRate: 10,
        frameBuffer: 200,
        loop: false,
        type: 'attack',
        imageSrc: AttackMeeleRight,
        hitBoxFrames: [9, 8, 7, 6],
        onComplete: () => {
        }
    },
    laserRight: {
        frameRate: 6,
        frameBuffer: 200,
        loop: false,
        imageSrc: GolemLaserRight,
        type: 'attack',
        attack: new AttackDTO({
            position: {
                x: 240,
                y: 325
            },
            dimensions: {
                width: 100
            },
            collisionBlocks: levels[3].collisionBlocks,
            currentLevel: levels[3],
            imageSrc: AttackLaserRight,
            verticalSrc: true,
            frameBuffer: 25,
            frameRate: 10,
            loop: false,
            hitBox: {
                position: {
                    x: 280,
                    y: 380
                },
                width: 35,
                height: 40
            },
            speed: 40
        })
    }
}

const EarthGolem = new BossDTO({
    position: {
        x: 160,
        y: 150
    },
    collisionBlocks: levels[3].collisionBlocks,
    currentLevel: levels[3],
    imageSrc: GolemIdleRight,
    frameRate: 4,
    frameBuffer: 200,
    loop: true,
    animations: bossAnimations,
    attackDelay: 1000
});

export default EarthGolem;
