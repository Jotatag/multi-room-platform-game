import SpriteDTO from '../sprite';
import switchCase from '../../utils/switchCase';
import { keyDown } from '../../services/eventListeners';

class DoorDTO extends SpriteDTO {
    constructor(
        { 
            position,
            imageSrc,
            frameRate,
            frameBuffer,
            loop,
            autoplay
        },
        player
    ) {
        super({ 
            position,
            imageSrc,
            frameRate,
            frameBuffer,
            loop,
            autoplay
        });

        this.player = player;
        this.binds = {
            'w': {
                'action': 'enter',
                'down': () => {
                    this.checkForPlayerCollision();
                }
            },
            '_default': {
                'down': () => {}
            }
        }

        this.bindKeys();
    }

    checkForPlayerCollision() {
        if(
            this.player.hitBox.position.x + this.player.hitBox.width <= this.position.x + this.width &&
            this.player.hitBox.position.x >= this.position.x &&
            this.player.hitBox.position.y + this.player.hitBox.height >= this.position.y &&
            this.player.hitBox.position.y <= this.position.y + this.height
        ) {
            this.player.velocity.x = 0;
            this.player.velocity.y = 0;
            this.player.preventInput = true;
            this.player.switchSprite('enterDoor');
            this.play();
            return;
        }

        return;
    }

    bindKeys() {
        const getKey = switchCase(this.binds);

        keyDown((key) => {
            getKey(key).down();
        });
    }

}

export default DoorDTO;
