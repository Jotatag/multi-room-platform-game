import SpriteDTO from '../sprite';
import { keyDown, keyUp } from '../../services/eventListeners';
import switchCase from '../../utils/switchCase';

class PlayerDTO extends SpriteDTO {
    constructor({ collisionBlocks = [], currentLevel, imageSrc, frameRate, animations, loop }) {
        super({ imageSrc, frameRate, animations, loop });
        this.position = {
            x: 200,
            y: 200
        }

        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 0.03;
        this.runSpeed = 1;

        this.sides = {
            bottom: this.position.y + this.height
        }

        this.lastDirection = 'right';

        this.movements = {
            'w': {
                'action': 'jump',
                'down': () => {
                    if (this.velocity.y !== 0) return;
                    if (this.preventInput) return;
                    if (this.checkForDoorCollision()) return;
                    this.velocity.y = -2.5;
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
        this.preventInput = false;

        this.collisionBlocks = collisionBlocks;
        this.currentLevel = currentLevel;
    }

    checkMovement() {
        if(this.preventInput) return;
        this.velocity.x = 0;
        if(this.movements.d.pressed) {
            this.switchSprite('runRight');
            this.velocity.x = Math.abs(this.runSpeed);
            this.lastDirection = 'right';
        } else if(this.movements.a.pressed) {
            this.switchSprite('runLeft');
            this.velocity.x = -Math.abs(this.runSpeed);
            this.lastDirection = 'left';
        } else {
            if(this.lastDirection === 'left') this.switchSprite('idleLeft');
            else this.switchSprite('idleRight');
        }
    }

    update() {
        this.position.x += this.velocity.x;
        this.updateHitBox();
        this.checkForHorizontalCollision();
        this.applyGravity();

        this.updateHitBox();
        this.checkForVerticalCollision();
    }

    updateHitBox() {
        this.hitBox = {
            position: {
                x: this.position.x + 58,
                y: this.position.y + 33
            },
            width: 50,
            height: 55
        };
    }

    applyGravity() {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    }

    checkForHorizontalCollision() {
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i];
            if(
                this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&
                this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
                this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                if(this.velocity.x < 0) {
                    const offSet = this.hitBox.position.x - this.position.x;
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offSet + 0.01;
                    break;
                }

                if(this.velocity.x > 0) {
                    const offSet = this.hitBox.position.x - this.position.x + this.hitBox.width;
                    this.position.x = collisionBlock.position.x - offSet - 0.01;
                    break;
                }
            }
        }
    }

    checkForVerticalCollision() {
        for(let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i];
            if(
                this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&
                this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
                this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height 
            ) {
                if(this.velocity.y < 0) {
                    this.velocity.y = 0;
                    const offSet = this.hitBox.position.y - this.position.y;
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offSet + 0.01;
                    break;
                }

                if(this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offSet = this.hitBox.position.y - this.position.y + this.hitBox.height;
                    this.position.y = collisionBlock.position.y - offSet - 0.01;
                    break;
                }
            }
        }
    }

    checkForDoorCollision() {
        for(let i = 0; i < this.currentLevel.doors.length; i++) {
            const door = this.currentLevel.doors[i];
            if(
                this.hitBox.position.x + this.hitBox.width <= door.position.x + door.width &&
                this.hitBox.position.x >= door.position.x &&
                this.hitBox.position.y + this.hitBox.height >= door.position.y &&
                this.hitBox.position.y <= door.position.y + door.height
            ) {
                this.velocity.x = 0;
                this.velocity.y = 0;
                this.preventInput = true;
                this.switchSprite('enterDoor');
                door.play();
                return true;
            }
        };

        return false;
    }

    bindMovements() {
        const getKey = switchCase(this.movements);

        keyDown((key) => {
            getKey(key).down();
        });

        keyUp((key) => {
            getKey(key).up();
        });
    }

    switchSprite(name) {
        if(this.image === this.animations[name].image) return;

        this.currentFrame = 0;
        this.image = this.animations[name].image;
        this.frameRate = this.animations[name].frameRate;
        this.frameBuffer = this.animations[name].frameBuffer;
        this.loop = this.animations[name].loop;
        this.currentAnimation = this.animations[name];
        this.currentAnimation.isActive = false;
    }
};

export default PlayerDTO;
