import SpriteDTO from '../sprite';
import { keyDown, keyUp } from '../../services/eventListeners';

class PlayerDTO extends SpriteDTO {
    constructor({ collisionBlocks = [], imageSrc, frameRate }) {
        super({ imageSrc, frameRate });
        this.position = {
            x: 200,
            y: 200
        }

        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 0.2;
        this.runSpeed = 2;

        this.sides = {
            bottom: this.position.y + this.height
        }

        this.switchCase =
            (obj) =>
            (value) => {
                return obj[value] || obj['_default'];
            }

        this.movements = {
            'w': {
                'action': 'jump',
                'down': () => {
                    if (this.velocity.y !== 0) return;
                    this.velocity.y = -7;
                },
                'up': () => {}
            },
            'a': {
                'action': 'left',
                'pressed': false,
                'down': () => { this.movements.a.pressed = true },
                'up': () => { this.movements.a.pressed = false }
            },
            'd': {
                'action': 'right',
                'pressed': false,
                'down': () => { this.movements.d.pressed = true },
                'up': () => { this.movements.d.pressed = false }
            },
            '_default': {
                'down': () => {},
                'up': () => {}
            }
        }
        this.bindMovements();

        this.collisionBlocks = collisionBlocks;
    }

    checkMovement() {
        this.velocity.x = 0;
        if(this.movements.d.pressed) this.velocity.x = Math.abs(this.runSpeed);
        else if(this.movements.a.pressed) this.velocity.x = -Math.abs(this.runSpeed);
    }

    update() {
        this.position.x += this.velocity.x;

        this.checkForHorizontalCollision();
        this.applyGravity();
        this.checkForVerticalCollision();
    }

    applyGravity() {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    }

    checkForHorizontalCollision() {
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i];
            if(
                this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x &&
                this.position.y + this.height >= collisionBlock.position.y &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                if(this.velocity.x < 0) {
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01;
                    break;
                }

                if(this.velocity.x > 0) {
                    this.position.x = collisionBlock.position.x - this.width - 0.01;
                    break;
                }
            }
        }
    }

    checkForVerticalCollision() {
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i];
            if(
                this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x &&
                this.position.y + this.height >= collisionBlock.position.y &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height 
            ) {
                if(this.velocity.y < 0) {
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01;
                    break;
                }

                if(this.velocity.y > 0) {
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y - this.height - 0.01;
                    break;
                }
            }
        }
    }

    bindMovements() {
        const getKey = this.switchCase(this.movements);

        keyDown((key) => {
            getKey(key).down();
        });

        keyUp((key) => {
            getKey(key).up();
        });
    }
}

export default PlayerDTO;
